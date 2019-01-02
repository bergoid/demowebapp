demowebapp
==========

Modules installed after create-react-app:
::

   npm install recompose react-router-dom react-hyperscript-helpers mobx mobx-react

   npm install bootstrap reactstrap axios



RecordsButtons:

   [ x Delete ]  [ Edit ]  [ + New ]

   Delete:
      . Deletes current selection

   New:
      . A modal pop-up form
      . Fields:
         . ID : readonly
         . Name
      . Random unique ID in 'ID'
      . Buttons:
         . Cancel
         . Save
            . Validation:
               . Name must be non-empty

   Edit:
      . A modal pop-up form
      . Fields:
         . ID : readonly
         . Name
      . Buttons:
         . Cancel
         . Save
            . Validation:
               . Name must be non-empty

Show closable alert box when request fails

use async/await in service methods

TODO:
   lighttpd:
      join 2 logfiles

   backend:
      add logging


   web app:
      use table (clickable, selectable row) as records list
