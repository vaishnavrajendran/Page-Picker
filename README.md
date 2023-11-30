## While opening the page the site will be redirected to clerk authentication
![Screenshot 2023-11-29 233325](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/bd8d9db4-9c8b-4c09-9d98-6685b9098278)
## After succesfull login , click on the plus icon, a modal will openup to upload the pdf.Only pdf files will be able to upload. Implemented front end and backend validation.
![Screenshot 2023-11-29 232226](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/98a3a9e0-f809-40db-9a0d-3a0ff0fb8b3b)
## After uploading the pdf, 1st page of the pdf is extracted and a thumbnail image is created. This image will be displayed instead of loading all the pdf files of the user.
![Screenshot 2023-11-29 232328](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/cba14c82-ccb3-4021-a22c-f67d6e02a169)
## When clicking on the thumbnail another page will be opened and this page displays all pages of the pdf. Here we can extract and rearrange the pdf by drag and dropping.
![Screenshot 2023-11-29 232437](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/8e74cdb7-c9cc-4cb4-91c0-ac9cb3bec8c5)
## Only selected pages will be extracted and the new pdf will be in the order how it is arranged by drag and dropping. Click on the rearrange or extract button to generate the download link.You have to select atleast one page to generate the downaload link.
![Screenshot 2023-11-29 232536](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/a120df72-30ed-4de0-b03d-f849ad384ffb)
## Then a download button will come near the extract page button.
![Screenshot 2023-11-29 232607](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/8a0707bf-4138-4940-b3eb-904c191f44ef)
## When clicking on the download button. The new pdf will be opened in the new tab and it will ask the permission to choose the download location.
![Screenshot 2023-11-29 232646](https://github.com/vaishnavrajendran/Page-Picker/assets/113851217/8bbcc7ca-2f41-4e1e-ae60-3b47c0fc144d)

## To run the application locally:
1>> Clone the repositories : 
  Page-Picker: https://github.com/vaishnavrajendran/Page-Picker
  Page-Picker-Server: https://github.com/vaishnavrajendran/Page-Picker-Server
2>> Add the necessary env's :
  For Page-Picker:
    Go to clerk website : https://clerk.com/ . Click on create an application and copy the two api keys. (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY & CLERK_SECRET_KEY)
    Copy and paste this common env's:
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    NEXT_PUBLIC_SERVER_BASEURL=http://localhost:8080  (Backend localhost address)
  
    Do npm install and npm run dev

  For Page-Picker-Server:
    PORT=8080
    MONGO_URL: //Add your mongodb atlas url
    SERVER_URL: http://localhost:8080

    Do npm install and npm startz
    
If any queries feel free to reachout me on vaishnavrajendran95@gmail.com or https://www.linkedin.com/in/vaishnav-r-b7b933195/
