# mockserver-example

Exemplo de utilização do mockserver para teste e2e

## Como rodar 

### Subir o client 
```bash
ng serve
```

### Subir o mockserver
```bash
cd mockserver
npm start
```

### Rodar o e2e
```bash
protractor e2e/protractor.conf.js
```