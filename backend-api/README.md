# Backend architecture
![Alt text](../backend.png?raw=true)

The project is divided into 3 apps
- api
- projects
- search

### API app
- offer auth views
- offer reusable mixins

### Projects app
- project model
- signal to conver text to embeddings
- expose crud api routes

### Search app
- connect to algolia search
- expose search api route
