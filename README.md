# Pendo Custom Snippets Repository
This library of custom code snippets has been created by Pendo Professional Services, intended to extend the capabailities of Pendo products.  All snippets in this library are *free* to use, and as such, there is NO WARRANTY, SLA or SUPPORT for these snippets.  Please do not reach out to Pendo Support for help with these snippets, as custom code is outside of the remit of their team and responsibilities.

For documentation on standard Pendo functionality, please visit the [Pendo Help Center](https://help.pendo.io/).

**Any requests to create new snippets, or modify / customize functionality within existing snippets should be forwarded to Pendo Professional Services (services@pendo.io) for scoping.  These will require a custom services contract in order to complete.**

## Aggregations
This repository contains custom aggregations queries, intended to utilize the [Pendo Aggregations API](https://developers.pendo.io/docs/?bash#aggregation).  These can be used to extract data out of Pendo in a custom format, usually in batch.

Assistance for writing custom aggregations can be provided in the form of a Professional Services Engagement (services@pendo.io)

## Guides
This repository contains custom HTML/CSS/JS snippets that can be used to extend the functionality of Pendo Guides.  All code, unless otherwise stated, should be inserted into a [Custom Code Building Block](https://support.pendo.io/hc/en-us/articles/360032206011-More-on-Custom-Code-Block) within a guide in the Pendo Visual Design Studio.  The vast majority of these snippets apply only to the [Visual Design Studio](https://support.pendo.io/hc/en-us/categories/360001404191-Guidance#Visual_Design_Studio), as opposed to the legacy [Classic Designer](https://support.pendo.io/hc/en-us/articles/360032206671-In-app-designer-Classic-). 

The sub-directories within this repository are based off of either actions that guides can do (advance a guide, dismiss a guide, delay a guide, etc), or modifications to existing Pendo building blocks or polls (customGuideAssets, guidePolls, etc).  Please avoid the _zz_deprecated_ snippets, as there are better ways, often using newer, in-product Pendo functionality, to achieve the same outcome.

## Resource Center
This repository contains custom HTML/CSS/JS snippets that can be used specifically to modify functionality of the [Pendo Resource Center](https://support.pendo.io/hc/en-us/articles/360031866712-Resource-Center-Overview), or its sub-modules (ie, Announcements, Code Sandboxes, etc).  Note that this is different than the legacy [Guides Center](https://support.pendo.io/hc/en-us/articles/360031867272-Guide-Center-Classic-); snippets for the Guides Center can be found in a sub-directory in this repository, but snippets will not work interchangeably between the two products.    

## Snippet Modifications
While the primary function of the Pendo Snippet is to initialize the Pendo Agent on your application, it can also be used to inject sitewide modifications to Pendo functionality.  There are many potential applications for this, including adding DOM attributes to Pendo guides, modifying guide behaviors, and others that are covered in the [Agent API Options](https://developers.pendo.io/docs/?bash#options) portion of our developer docs.  

Note that this section does NOT cover [Pendo Metadata](https://support.pendo.io/hc/en-us/articles/360031832072-Visitor-and-Account-Metadata), which is core product functionality and should be handled per the standard snippet initiatlization procedures.  
