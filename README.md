# 📚 EscolaAPI - Web API em .NET

API desenvolvida em **.NET 8 Web API** para gerenciamento de uma escola,
incluindo alunos e professores. O projeto segue boas práticas de
arquitetura, utilizando **DTOs, Services, Repositories** e **Entity
Framework Core** para persistência de dados.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   **.NET 8 Web API**
-   **Entity Framework Core**
-   **PostgreSQL** (ou outro banco configurado no `appsettings.json`)
-   **Swagger (Swashbuckle)** para documentação da API

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    Projeto-Curso-WebAPI-main/
    │── EscolaAPI.sln
    │── EscolaAPI/
    │   ├── Controllers/       # Controladores (Alunos, Professores)
    │   ├── DTOs/              # Objetos de transferência de dados
    │   ├── Data/              # AppDbContext e Migrations
    │   ├── Models/            # Entidades (Aluno, Professor)
    │   ├── Repositories/      # Interfaces e implementações de repositórios
    │   ├── Services/          # Regras de negócio
    │   ├── Program.cs         # Configuração principal
    │   ├── appsettings.json   # Configuração de banco e ambiente

------------------------------------------------------------------------

## ⚙️ Configuração e Execução

### Pré-requisitos

-   [.NET 8 SDK](https://dotnet.microsoft.com/download)
-   Banco de dados **PostgreSQL** (ou outro configurado)

### Clonar o repositório

``` bash
git clone <url-do-repositorio>
cd Projeto-Curso-WebAPI-main/EscolaAPI
```

### Configurar o banco de dados

Edite o arquivo `appsettings.json`:

``` json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=EscolaDB;Username=postgres;Password=suasenha"
}
```

### Rodar as migrations

``` bash
dotnet ef database update
```

### Executar a API

``` bash
dotnet run
```

A API estará disponível em:

    https://localhost:5001/swagger

------------------------------------------------------------------------

## 📌 Endpoints Principais

### Alunos

-   `GET /api/alunos` → Lista todos os alunos\
-   `GET /api/alunos/{id}` → Busca aluno por ID\
-   `POST /api/alunos` → Cria novo aluno\
-   `PUT /api/alunos/{id}` → Atualiza aluno existente\
-   `DELETE /api/alunos/{id}` → Remove aluno

### Professores

-   `GET /api/professores` → Lista todos os professores\
-   `GET /api/professores/{id}` → Busca professor por ID\
-   `POST /api/professores` → Cria novo professor\
-   `PUT /api/professores/{id}` → Atualiza professor existente\
-   `DELETE /api/professores/{id}` → Remove professor

------------------------------------------------------------------------

## 🏗️ Arquitetura

O projeto segue a separação em camadas: - **Controllers** → Exposição de
endpoints REST\
- **Services** → Lógica de negócio\
- **Repositories** → Comunicação com banco de dados\
- **DTOs** → Garantia de encapsulamento e segurança na troca de dados

------------------------------------------------------------------------

## 📖 Documentação

Ao rodar o projeto, acesse a interface do **Swagger** em:

    https://localhost:5001/swagger

Lá você poderá explorar e testar todos os endpoints.

------------------------------------------------------------------------

## 👨‍💻 Autor

Desenvolvido como projeto de curso de **Web API com .NET**.
