// note: this snippet leverages the fetch and filesAPI  (https://developer.mozilla.org/en-US/docs/Web/API/File). 
// Dependent on your product's browser support requirements you may not be able to use this. 

// You'll also see a few different @TODO's buried in here. While functional, this form could no doubt be improved. 
// Feel free to submit pull requests with improvements for review. 

// lastly, if you're using the html as is, you'll need to write a bit of javascript to toggle the section open. That is not included in this repo.  

(function() {
  var formBody = document.querySelector('#_pendo-contact-form__body_'),
    form = document.querySelector('._pendo-contact-form_'),
    formSubmit = document.querySelector('._pendo-contact-form__submit_'),
    formNotifications = document.querySelector('._pendo-contact-form__notifications_'),
    formClose = document.querySelector('.section__contact-modal-close'),
    formBack = document.querySelector('.section__contact-modal-back'),
    success = document.querySelector('._pendo-contact-form__success_'),
    fail = document.querySelector('._pendo-contact-form__fail_'),
    dropzone = document.querySelector('._pendo-contact-form__drop-zone_'),
    dropzoneOverlay = document.querySelector('._pendo-contact-form__drop-zone-overlay_'),
    dropzoneOverlayDragover = document.querySelector('._pendo-contact-form__dragover-block_'),
    dropzoneMask = document.querySelector('._pendo-contact-form__drop-zone-mask_'),
    dropzoneId = 'file_input_' + Date.now(),
    dropzoneInput = document.querySelector('[data-pendo-drop-zone-input]'),
    dropzoneTrigger = document.querySelector('[data-pendo-drop-zone-trigger]'),
    dropzoneUploads = document.querySelector('[name="uploads"]'),
    dropzoneUploadsTextBox = document.querySelector('._pendo-contact-form__drop-zone-text_'),
    dropzoneUploadsProgress = document.querySelector('._pendo-contact-form__drop-zone-overlay__progress_'),
    dropzoneUploadsProgressCircleSVG = document.querySelector('._pendo-contact-form__drop-zone-progress_'),
    dropzoneUploadsProgressCircleFill = document.querySelector('._pendo-contact-form__drop-zone-progress__fill_'),
    dropzoneMaxUploads = 5;


  function init() {
    dropzoneInput.setAttribute('id', dropzoneId);
    dropzoneTrigger.setAttribute('for', dropzoneId);
  }
  init();


  var i, dropped = false;

  var onSelectFile = function(files) {
    uploadsProgress();
    // @TODO: check to see if filetype and/or size is acceptable prior to uploading
    // reject if not
    var remoteCallsRemaining = files.length;
    for (i = 0; i < files.length; i++) {
      var file = files[i];
      // scoping is an issue here with multiple files for both dnd and input select.
      // using 'let' works well here. if you set to 'var', you end up with two uploads of the same file. no bueno.
      let reader = new FileReader();
      reader.onload = function(e) {
        fetch('https://pendo.zendesk.com/api/v2/uploads.json?filename=' + escape(file.name), {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/binary'
          }),
          body: e.target.result
        }).then(function(response) {
          if (!response.ok) {
            throw response
          }
          return response.json();
        }).then(function(data) {
          if (!data.upload.token) {
            throw data
          } else {
            var attachment = document.createElement('div');
            attachment.className = '_pendo-contact-form__drop-zone-attachment_';
            attachment.dataset.dropZoneAttachmentId = data.upload.token;

            dropzone.insertBefore(attachment, dropzoneUploadsTextBox);

            var fragment = document.createDocumentFragment();

            removeAttachment = document.createElement('button');
            removeAttachment.className = '_pendo-contact-form__drop-zone-remove-attachment_';
            removeAttachment.type = 'button';
            removeAttachment.innerHTML = '<ts-icon class="ts_icon_times_circle">&times;</ts-icon>';

            attachmentPreview = document.createElement('img');
            attachmentPreview.className = '_pendo-contact-form__drop-zone-preview_';
            attachmentPreview.onload = function() {
              --remoteCallsRemaining;
              if (remoteCallsRemaining <= 0) {
                updateScrollPosition();
                resetUploadsProgress();
              }
            }
            attachmentPreview.src = data.upload.attachment.content_url;

            fragment.appendChild(removeAttachment);
            fragment.appendChild(attachmentPreview);


            attachment.appendChild(fragment);
            removeAttachment.addEventListener('click', removeTheAttachment, false);


            var uploads = uploadsTokenList();
            dropzoneToken = data.upload.token;
            uploads.push(dropzoneToken);
            dropzoneUploads.value = (uploads.join());
          }
          return;
        }).catch(function(error) {
          handleErrors('uploads');
          return;
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  var onSubmitForm = function(e) {
    formData = new FormData(form);
    var email = formData.get('email');
    var subject = formData.get('subject');
    var body = formData.get('body');

    // @TODO: could be used to create name variable for the requester object...

    // var name = function(email) {
    //   var uHostName = email.split("@", 2)[0];
    //   var paths = uHostName.split(/[._]/);
    //   return p.default.map(paths, p.default.capitalize).join(" ");
    // }(email);

    fetch('https://pendo.zendesk.com/api/v2/requests.json', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          request: {
            subject: subject,
            comment: {
              body: body,
              uploads: [formData.get('uploads')]
            },
            requester: {
              name: email,
              email: email
            }
          }
        })
      }).then(function(response) {
        if (!response.ok) {
          throw response
        }
        form.style.display = 'none';
        formSubmit.classList.remove('is-submitting');
        success.style.display = 'block';
        setTimeout(function() {
          formClose.click();
        }, 3000);
        setTimeout(function() {
          success.style.display = 'none';
          form.reset();
          var allAttachments = document.getElementsByClassName('_pendo-contact-form__drop-zone-attachment_');
          while (allAttachments[0]) {
            allAttachments[0].parentNode.removeChild(allAttachments[0]);
          }
          form.style.display = 'block';
        }, 3300);
        return;
      })
      .catch(function(error) {
        handleErrors('submit');
        return;
      });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formSubmit.disabled = true;
    formSubmit.classList.add('is-submitting');
    onSubmitForm();
  });

  formBody.ondragover = function(e) {
    dropzone.classList.add('dragover');
    dropzoneOverlay.style.display = 'block';
    dropzoneOverlayDragover.style.display = 'block';
    dropzoneMask.style.display = 'block';
    e.dataTransfer.dropEffect = 'copy';
    e.preventDefault();
    return false;
  }

  dropzoneMask.ondragend = function(e) {
    dropzone.classList.remove('dragover');
    dropzoneMask.style.display = 'none';
    e.preventDefault();
    return false;
  }

  dropzoneMask.ondragleave = function(e) {
    dropzone.classList.remove('dragover');
    dropzoneOverlay.style.display = 'none';
    dropzoneOverlayDragover.style.display = 'none';
    dropzoneMask.style.display = 'none';
    e.preventDefault();
    return false;
  }

  dropzoneMask.ondrop = function(e) {
    e.preventDefault();
    dropped = true;
    dropzone.classList.remove('dragover');
    dropzoneMask.style.display = 'none';
    dropzoneOverlayDragover.style.display = 'none';
    files = e.target.files || e.dataTransfer.files;
    onSelectFile(files);
    return dropped = false;
  }

  dropzoneTrigger.onclick = function(e) {
    e.preventDefault();
    dropzoneInput.click();
  }

  dropzoneInput.onchange = function() {
    if (!dropped) {
      dropzoneOverlay.style.display = 'block';
      dropzoneOverlayDragover.style.display = 'none';
      onSelectFile(this.files);
    }
    dropped = false;
  }

  var handleErrors = function(errorType) {
    errorMessage = document.createElement('p');
    errorMessage.id = '_pendo-contact-form__notice__error_' + Date.now();
    errorMessage.className = '_pendo-contact-form__notice_ is-error';
    if (errorType === 'submit') {
      errorMessage.innerHTML = 'There was an error trying to submit your ticket. Please try again.';
    } else if (errorType === 'uploads') {
      errorMessage.innerHTML = 'Sorry, something went wrong when we were uploading your attachment. Please try again, or submit your request without an attachment.';
    }
    formNotifications.appendChild(errorMessage);
    setTimeout(function() {
      errorMessage.classList.add('error-fade-out');
      setTimeout(function() {
        formNotifications.innerHTML = null;
      }, 500);
    }, 5000);
  }

  var uploadsTokenList = function() {
    var dropzoneUploadsList = [];
    if (dropzoneUploads.value) {
      dropzoneUploadsList = dropzoneUploads.value.split(",");
    }
    return dropzoneUploadsList;
  }

  var uploadsProgress = function() {
    dropzoneUploadsProgress.style.display = 'block';
    var dropzonePercentUploaded = 0;
    var animateUpload = setInterval(function() {
      var dropzoneUploadsFill = 100 - dropzonePercentUploaded;
      dropzoneUploadsProgressCircleFill.style.strokeDashoffset = dropzoneUploadsFill;
      dropzonePercentUploaded++
      if (dropzonePercentUploaded === 100) {
        clearInterval(animateUpload);
        (function() {
          return uploadsDisplayCurrentStyle = dropzoneUploadsProgress.currentStyle ? dropzoneUploadsProgress.currentStyle.display :
            getComputedStyle(dropzoneUploadsProgress, null).display;
        }());
        if (uploadsDisplayCurrentStyle === 'block') {
          dropzoneUploadsProgressCircleSVG.classList.add('_pendo-contact-form__drop-zone-progress__pulse_');
        }
      }
    }, 50);
  }

  var resetUploadsProgress = function() {
    dropzoneUploadsProgressCircleFill.style.strokeDashoffset = 0;
    dropzoneOverlay.classList.add('_pendo-contact-form__fade-out_');
    dropzoneUploadsProgressCircleSVG.classList.remove('_pendo-contact-form__drop-zone-progress__pulse_');
    setTimeout(function() {
      dropzoneOverlay.style.display = 'none';
      dropzoneOverlay.classList.remove('_pendo-contact-form__fade-out_');
      dropzoneUploadsProgress.style.display = 'none';
      dropzoneUploadsProgressCircleFill.style.strokeDashoffset = 0;
    }, 300);
  }

  // @TODO: when removing attachments, reduce overall attachment count so that dropzoneMaxUploads actually has a reason for existing
  var removeTheAttachment = function() {
    var uploads = uploadsTokenList();
    var attachmentToRemoveToken = this.parentNode.dataset.dropZoneAttachmentId;
    removeAttachmentTokenFromUploads();
    this.parentNode.remove();

    function removeAttachmentTokenFromUploads() {
      index = uploads.indexOf(attachmentToRemoveToken);
      if (index > -1) {
        uploads.splice(index, 1);
        return dropzoneUploads.value = (uploads.join());
      }
    }
  }

  var updateScrollPosition = function() {
    var contactForm = document.getElementById('_pendo-launcher-section__feature_');
    var isScrolledToBottom = contactForm.scrollHeight - contactForm.clientHeight <= contactForm.scrollTop + 1;
    if (!isScrolledToBottom) {
      contactForm.scrollTop = contactForm.scrollHeight - contactForm.clientHeight;
    }
  }

  // Internally at Pendo, we use email address for our visitor Id.  We can use this to prepopulate the requester field for zendesk.
  // If you use email, you can leverage this as well. If not, you'll want to come up with your own dynamic populating for the requester field.
  var visitorId = pendo.getVisitorId();

  if (visitorId !== null) {
    emailAddress = document.getElementById('email');
    emailAddress.value = visitorId;
    emailAddress.type = 'hidden';
    emailAddress.parentNode.style.marginBottom = '0';
  }
}());