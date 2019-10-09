(function(dom, _) {
    var visibleClass = '_pendo-active_';
    var hiddenClass = '_pendo-hidden_';
    var searchForm = dom('._pendo-kb-search-box_');
    var searchInput = dom('#_pendo-kb-search-input_');
    var searchInputClear = dom('._pendo-kb-clear-search-icon_');
    var topSearch = dom('._pendo-section-content-body-top-searches_');
    var topSearchHeader = dom('._pendo-section-content-top-searches-header_');
    var kbTopics = dom('.kb-topics');
    var resultsElement = dom('._pendo-section-content-body-results_');
    var articleDisplay = dom('._pendo-section-content-body-article_');
    var knowledgeBaseURL = "https://d3v-pendosupport.zendesk.com/api/v2/help_center/";
    var token =
      "2229a9899524c6b7fb64813241b1c9bdef346add528d504ceb8dbc297e5cc045";
    var articlesEndpoint = "articles/";
    var searchEndpoint = "articles/search.json?query=";
    var sectionsEndpoint = "sections.json";
    var categoriesEndpoint = "categories.json";
    var queryLimit = "&per_page=10";
    var sectionMap = {};
    var categoryMap = {};
    var header = {
      Authorization: "Bearer " + token
    };
    var sectionConfig = {
      url: knowledgeBaseURL + sectionsEndpoint + "?per_page=100",
      method: "GET",
      headers: header,
      type: "sections"
    };
    var categoryConfig = {
      url: knowledgeBaseURL + categoriesEndpoint,
      method: "GET",
      headers: header,
      type: "category"
    };
    if (pendo._.isUndefined(pendo.pro)) {
      pendo.pro = {};
    }

    buildKB();

    dom('[data-id="kb"]')
        .on('click', '.faq-topic', function(e) {
            var topic = eventTarget(e).closest('.faq-topic');
            var topicId = topic.dataset.topicId;
            displayTopicData(topicId);
        })
        .on('click', '._pendo-section-content-go-back_', function(e) {
            dom(articleDisplay).html('');
            hide(articleDisplay);
            show(topSearch);
            show(resultsElement);
            resetSearch(e);
        });

    function returnToStart(e) {
        dom(articleDisplay).html('');
        hide(articleDisplay);
        show(topSearch);
        show(resultsElement);
        resetSearch(e);
    }

    function buildKB() {
        hide(articleDisplay);
        kbTopics.html('');
        topSearchHeader.html('');
        kbTopics.append(
            '<h4 class="_pendo-kb-no-search_"><span>For tips, tricks, and how tos, try searching for keywords above</span></h4>'
        );
    }

    function buildResults(listOfArticles) {
        var articlesElement = [];
        _.each(listOfArticles, function(article, i) {
            if (pendo._.isEmpty(article.body)) {
                articlesElement.push(
                    [
                        '<div class="_pendo_card_module_">' +
                            '<a href="' + article.html_url + '" target="_blank" rel="noopener noreferrer"><button type="button" class="_pendo-kb-open-external_"></button></a>' +
                            '<dd class="_pendo-kb-title_">' +
                            article.title +
                            '</dd></div>'
                    ].join('\n')
                );
            } else {
                articlesElement.push(
                    [
                        '<div class="_pendo_card_module_ _pendo-article-content-main_">' +
                            '<a href="' + article.html_url + '" target="_blank" rel="noopener noreferrer"><button type="button" class="_pendo-kb-open-external_"></button></a>' +
                            '<dt class="_pendo-kb-title_">' +
                            article.title +
                            '</dt>' +
                            '<dd class="_pendo-kb-body_">' +
                            article.body +
                            '</dd></div>'
                    ].join('\n')
                );
            }
        });
        return articlesElement.join('\n');
    }

    // Template to display when no results are found
    function notFoundTemplate(data) {
        var notFound = [
            '<div class="_pendo-section-content-body-article_">',
            headerTemplate(data),
            '<div class="_pendo_card_module_ _pendo-article-content-main_">' +
                '<dt class="_pendo-kb-title_">' +
                "No matches found for '" +
                data +
                "'" +
                '</dt>' +
                '<dd class="_pendo-kb-body_">' +
                'Sorry we didn\'t find what you\'re looking for. Please try another keyword.' +
                '</dd></div>'
        ].join('\n');
        return notFound;
    }

    var headerTemplate = function(data) {
        return [
            '<div class="_pendo-section-content-top-searches-header_">',
            'SEARCH RESULTS',
            '<a href="javascript:void(0);" class="_pendo-section-content-clear-search_">Clear</a>',
            '</div>'
        ].join('\n');
    };

    /* var articleHeaderTemplate = function() {
        return [
            '<a href="javascript:void(0);" class="_pendo-section-content-go-back_">‹ Back</a>'
        ].join('\n');
    }; */

    // Show searching animated icon on search input
    /* function isSearching() {
        dom('[data-id="kb"] ._pendo-launcher-search-box_').append(
            loadingContentElement
        );
        hide('._pendo-section-content-clear-search_');
        hide(topSearch);
        // dom("._pendo-section-content-body-article_").remove();
    } */

    // Hide animated searching icon and show cancel icon
    /* function resultsReturned() {
        hide('._pendo-section-form-search-loading_');
        show('._pendo-section-form-search-cancel_');
    } */

    function resetSearch(e) {
        searchInput[0].value = '';
        hide(dom('._pendo-section-content-clear-search_'));
        hide(searchInputClear);
    }

    // Template to display when loading
    /* function contentLoading() {
        hide(dom('._pendo-section-content-clear-search_'));
        dom('[data-id="kb"] ._pendo-launcher-search-box_').append(
            loadingContentElement
        );
        hide(topSearch);
        hide(resultsElement);
        hide(articleDisplay);
    } */

    // Remove the loading content/elements
    /* function contentLoaded(element) {
        setTimeout(function() {
            dom('._pendo-ext-search-controller-loading_').remove();
            show(element);
            show(articleDisplay);
            if (dom('#_pendo-launcher-faq-search-input_')[0].value !== '') {
                show(dom('._pendo-section-content-clear-search_'));
            }
        }, 800);
    } */

    function eventTarget(e) {
        return (e && e.target) || e.srcElement;
    }

    // Convenience to quickly hide elements
    function hide(element) {
        dom(element).removeClass(visibleClass);
        dom(element).addClass(hiddenClass);
    }

    // Convenience to quickly show elements
    function show(element) {
        dom(element).removeClass(hiddenClass);
        dom(element).addClass(visibleClass);
    }

    // Replace default search functionality
    searchForm.on('submit', function(e) {
        e.preventDefault();
    });

    // Execute search and show clear button when values are typed into search field
    searchInput.on('input', function(e) {
        if (!searchInput[0].value) {
            hide(searchInputClear);
            db_searchKB(''); // Let the debounced function handle clearing the results to avoid overlap
        } else {
            show(searchInputClear);
            db_searchKB(searchInput[0].value);
        }
    });

    // Clear search on clicking the clear button
    searchInputClear.on('click', function(e) {
        returnToStart(e);
        searchInput.focus();
    });

    // Debounced search function
    var db_searchKB = pendo._.debounce(searchKB, 350, false);

    // Execute search function
    function searchKB(searchString) {
        if (searchString == '') {
            // Clear results and return to suggested topics on a blank string entered
            returnToStart();
        } else {
            const url = knowledgeBaseURL + searchEndpoint + searchString;
            pendo.ajax({
                "url": url,
                "method": "GET",
                "headers": header
            }).then((response) => {
                displaySearchResults(response.data,searchString);
            }).fail((response) => {
                displaySearchResults({},searchString);
            })

            // Clears body and displays results
        }
    }

    // Displays the questions input as search results. If no questions are provided, displays a 'Not Found' message.
    function displaySearchResults(articlesList, searchString) {
        // Clears the results block
        dom(articleDisplay).html('');

        // Remove standard display items
        hide(topSearch);
        hide(resultsElement);
        show(articleDisplay);

        searchResult = articlesList.results;
        console.log(Object.keys(searchResult).length);

        if (typeof searchResult !== "undefined" && Object.keys(searchResult).length > 0) {
            // Show results if there are any
            var articlesElement = buildResults(searchResult);
            var articleContent = [
                '<div class="_pendo-section-content-body-article_">',
                headerTemplate(searchString),
                articlesElement
            ].join('\n');
            articleDisplay.append(articleContent);
        } else {
            // Show 'Not Found' message if there are no results=
            articleDisplay.append(notFoundTemplate(searchString));
        }

        // Attach onClick handler to the new clear button
        dom('._pendo-section-content-clear-search_').on('click', function(e) {
            returnToStart(e);
        });
    }
})(pendo.dom, pendo._);
