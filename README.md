# vuetify-vue-i18n-integration-workaround

Building a upload form found that the show-size property of the VFileInput component doesn't show the correct string when using the i18n integration with adapter function createVueI18nAdapter. I created a StackBlitz project to reproduce the issue where you can drop a file to the component and see the show-size string and the expectet string.

[Test the i18n integration issue on StackBlitz ⚡️](https://stackblitz.com/edit/vuetify-vue-i18n-integration-workaround?file=workaround%2Fvuetify-3.1.2%2Flib%2Flocale%2Fadapters%2Fvue-i18n.mjs%3AL3,workaround%2Fvuetify-3.1.2%2Flib%2Flocale%2Fadapters%2Fvuetify.mjs%3AL16,workaround%2Fvuetify-3.1.2%2Flib%2Fcomponents%2FVFileInput%2FVFileInput.mjs%3AL87,README.md)

I tried to fix by myself and found that the i18n `t` function expects an array/object of params where the vuetify function expects a list of params (param1, param2, ...). I patch the vuetify adapter to accept params as array/object, downgrade the `t` function on i18n adapter to use the vuetify one and the VFileInput component to pass the params as an array. The patched files are in the directory ''workaround'' and the code is marked with the //TODO: comment. Also I make a fork of the StackBlitz project with the workaround or you can make a fork and rename .stackblitzrc.disabled file to .stackblitzrc to get the workaround working.

[Test the workaround fork on StackBlitz ⚡️](https://stackblitz.com/edit/vuetify-vue-i18n-integration-workaround-forked?file=workaround%2Fvuetify-3.1.2%2Flib%2Flocale%2Fadapters%2Fvue-i18n.mjs%3AL3,workaround%2Fvuetify-3.1.2%2Flib%2Flocale%2Fadapters%2Fvuetify.mjs%3AL16,workaround%2Fvuetify-3.1.2%2Flib%2Fcomponents%2FVFileInput%2FVFileInput.mjs%3AL87,README.md)
