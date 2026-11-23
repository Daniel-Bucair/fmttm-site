# FMTTM — Site institucional

Site da Federação Matogrossense de Tênis de Mesa. HTML, CSS e JS puros, sem build e sem backend, publicado no Vercel a cada `git push` na branch `main`.

- O que falta fazer: [PENDENCIAS.md](PENDENCIAS.md)
- Regras do projeto (cache, fotos, dados pessoais, decisões já tomadas): [CLAUDE.md](CLAUDE.md)

## Para começar a trabalhar

1. Ter acesso de colaborador ao repositório `Daniel-Bucair/fmttm-site` no GitHub.
2. `git clone https://github.com/Daniel-Bucair/fmttm-site.git`
3. Abrir a pasta e rodar `claude`. Ele lê o `CLAUDE.md` e o `PENDENCIAS.md` sozinho; basta dizer por qual item quer começar.
4. Para ver o site, abrir `index.html` no navegador.
5. `git pull` antes de cada sessão; `git push` publica.

## Estrutura

```
/
├── index.html           Home (topo com fotos, próximos torneios, Destaques, atalhos)
├── eventos.html         Lista de eventos (próximos e realizados)
├── evento.html          Copa MT 4ª etapa (modelo para novas páginas de evento)
├── evento-*.html        Uma página por evento de 2026
├── calendario.html      Linha do tempo mês a mês com filtros
├── clubes.html          Clubes filiados com busca e filtro por cidade
├── transmissoes.html    Canal do YouTube
├── governanca.html      Diretoria, conselho fiscal e documentos
├── transparencia.html   Convênios e demonstrativos
├── notas.html           Notas oficiais
├── 404.html
├── vercel.json          URLs sem .html e regras de cache
└── assets/
    ├── css/             tokens, base, components, layout e um CSS por página
    ├── js/              animacoes.js e carrossel.js
    ├── img/             logo, fotos do topo, do Destaques e dos cabeçalhos
    └── docs/            circulares/, resultados/, institucional/ e regulamentos
```

## Como editar

- **Cor da marca:** `assets/css/tokens.css` (`--cor-azul`, `--cor-verde`, `--cor-amarelo`).
- **Evento no calendário:** copiar um bloco `<section class="timeline-mes">` em `calendario.html` e ajustar `data-abrangencia` e `data-status`.
- **Clube:** copiar um `<article class="clube-card">` em `clubes.html` e preencher `data-nome` e `data-cidade` (sem acento, minúsculas) para o filtro funcionar.
- **Nota oficial:** copiar um `<a class="nota-linha">` em `notas.html`; para o texto completo, duplicar o `<article class="nota-detalhe">` com um `id` igual ao `href`.
- **Convênio:** acrescentar ao array `CONVENIOS` no fim de `transparencia.html`.

## Notas técnicas

- **Fontes:** DM Sans, Montserrat e IBM Plex Mono via Google Fonts.
- **Datas** são texto já formatado. Se um dia virarem JS, usar `new Date(ano, mês-1, dia)`: `new Date("2026-11-15")` é lido como UTC e vira dia 14 em Cuiabá.
- **Tabela de transparência** vira cards abaixo de 860px; cada célula leva o rótulo em `data-rot`.
- **Acessibilidade:** `skip-link`, foco visível, `aria-current`, `aria-expanded` no menu, respeito a `prefers-reduced-motion`.
