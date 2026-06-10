# Grimório Arcano

App local para controlar magias de personagens de D&D em mesa presencial.

## Abrir

Abra `index.html` no navegador.

Para servir na rede local:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local.ps1 -Port 8123
```

Depois acesse:

```text
http://localhost:8123
```

Outros dispositivos na mesma rede podem tentar acessar pelo IP do computador que abriu o servidor.

## Recursos

- biblioteca de magias com busca e filtros;
- personagens locais;
- magias aprendidas, preparadas e conjuradas;
- controle de espaços por círculo;
- cálculo automático por progressão de conjurador;
- rolagem de dano/cura;
- concentração e efeitos ativos;
- magias homebrew;
- temas de grimório;
- exportação/importação em JSON.
- importação de JSON próprio ou compatível com formato 5e.tools.

## Dados

O app salva tudo no armazenamento local do navegador. Use `Dados > Exportar JSON` para backup.

A biblioteca inicial usa nomes e resumos inspirados em material aberto do SRD sob CC BY 4.0. Magias de livros pagos devem ser cadastradas/importadas apenas quando o grupo tiver direito de usar esse conteúdo.

## Importar magias

Use `Dados > Importar JSON`.

Formatos aceitos:

- backup exportado pelo próprio Grimório;
- lista simples de magias no formato interno;
- arquivo com `spells`;
- arquivo com `spell`, formato comum em dados compatíveis com 5e.tools.

O importador tenta converter nomes, círculo, escola, tempo, alcance, componentes, duração, concentração, ritual, classes, dano, teste de resistência, tags e fonte.
