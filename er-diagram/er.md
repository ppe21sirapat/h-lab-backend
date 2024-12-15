```mermaid
erDiagram

    product {
        id int PK
        price int
        size string
    }

    language {
        id int PK
        name string
        code string
    }

    translation {
        id int PK
        languageId int FK
        productId int FK
        name string
        description string
    }

    product ||--|{ translation : "-"
    language ||--|{ translation : "-"
```
