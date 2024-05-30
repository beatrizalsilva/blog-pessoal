# Blog Pessoal
Projeto inciado no bloco 2, para desenvolvermos uma aplicação completa desde o backend ao frontend.

## Recursos
- CRUD completo de postagem e tema.
- Cadastrar, consultar, atualizar e autenticar (checagem de segurança via token) usuário.

## Tecnologias usadas
- TypeScript
- Nest JS
- Git
- MySQL
- Insomnia
- Swagger

## Como usar
1. Clone o repositório:
```cmd
git clone https://github.com/beatrizalsilva/blog-pessoal.git
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação com os seguintes comandos:
```bash
# modo desenvolvedor
npm run start:dev

# modo de produção
npm run start:prod
```

4. Para testar a aplicação, utilize os seguintes comandos:
```bash
# teste unitário
npm run test

#teste ent-to-end (e2e)
npm run test:e2e 
```

5. Para executar os testes do Insomnia:
- [Baixe e instale o Insomia](https://insomnia.rest/download).
- Importe o arquivo [BlogPessoal Teste](https://github.com/beatrizalsilva/blog-pessoal/blob/main/test/BlogPessoal%20Teste) para o Insomnia.
