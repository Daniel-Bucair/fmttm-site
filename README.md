# FTMMT — Site institucional

Site estático em HTML/CSS/JS puros da Federação de Tênis de Mesa de Mato Grosso. Sem build, sem backend, pronto pra deployar no Vercel.

## Estrutura

```
/
├── index.html              Página inicial (hero, próximo evento, notas, atalhos)
├── eventos.html            Listagem de eventos (próximos + realizados)
├── evento.html             Página de detalhe de um evento (modelo genérico)
├── calendario.html         Linha do tempo mês a mês com filtros
├── clubes.html             Grid alfabético de clubes com busca + filtro por cidade
├── transmissoes.html       Canal do YouTube, destaque e grid de vídeos
├── governanca.html         Diretoria, conselho fiscal e documentos
├── transparencia.html      Painel, tabela de convênios e demonstrativos
├── notas.html              Lista de notas oficiais com busca por categoria/ano
├── assets/
│   ├── css/                Um CSS por responsabilidade (tokens, base, componentes, layout, página)
│   ├── js/                 (reservada para scripts futuros)
│   └── img/
│       └── logo-symbol.svg Recriação provisória do símbolo (trocar pelo oficial)
```

## O que ainda falta você me mandar

### Marca
- [ ] Logo oficial em vetor (SVG) ou PNG em alta resolução
- [ ] Versão branca do logo (para fundo azul)
- [ ] Favicon dedicado (se diferente do símbolo)
- [ ] Manual da marca ou valores oficiais de cor (os atuais foram estimados pelo JPEG do logo)

### Dados institucionais
- [ ] CNPJ real da federação
- [ ] Endereço completo da sede
- [ ] E-mail oficial de contato
- [ ] Nome do usuário real do Instagram
- [ ] URL do canal do YouTube (ex.: `https://youtube.com/@ftmmt`)
- [ ] ID de um vídeo em destaque para embed na página Transmissões
- [ ] Nome oficial da Secretaria de Estado parceira

### Diretoria (`governanca.html`)
- [ ] Composição real da diretoria (6 cargos preenchidos como "Nome Exemplo")
- [ ] Composição real do conselho fiscal (4 cargos)
- [ ] Datas de início e fim do mandato vigente
- [ ] PDFs de estatuto, regimento, atas, código técnico, tabela de taxas

### Eventos (`eventos.html`, `evento.html`, `calendario.html`)
- [ ] Calendário oficial da temporada 2026/2027
- [ ] Nome, data, cidade, local, categorias de cada evento
- [ ] Links reais de regulamento, inscrição e resultados
- [ ] Para cada evento: criar uma cópia de `evento.html` renomeada
      (ex.: `evento-copa-mt-3-etapa.html`) e trocar os textos

### Clubes (`clubes.html`)
- [ ] Lista oficial de clubes filiados
- [ ] Para cada clube: nome, sigla (3 letras), cidade, responsável, local/horário de treino, contato, Instagram

### Transparência (`transparencia.html`)
- [ ] Nome oficial do(s) concedente(s) e número(s) dos termos
- [ ] Valor, contrapartida e vigência de cada convênio
- [ ] Objeto detalhado de cada convênio
- [ ] Links para PDFs: termo assinado, plano de trabalho, prestação de contas
- [ ] Balanços e DREs dos últimos exercícios

### Notas oficiais (`notas.html`)
- [ ] Texto integral de cada nota numerada
- [ ] PDF assinado pela presidência de cada nota
- [ ] Categoria correta (competição, arbitragem, administrativo, institucional)

## Decisões técnicas em curto

- **Sem build e sem framework.** Edita o HTML direto, abre no navegador, deployou.
- **Fontes:** IBM Plex Sans + IBM Plex Mono via Google Fonts com `preconnect` e `display=swap`. Se a performance em internet ruim virar problema, migrar pra auto-hospedagem (baixar os `.woff2`, servir de `/assets/fonts/`, remover o `<link>` do Google).
- **Datas em America/Cuiaba:** o site mostra as datas em texto já formatado (ex.: `15 e 16 · NOV 2026`). Quando migrar pra JS dinâmico, lembrar que `new Date("2026-11-15")` interpreta como UTC e vira dia 14 em Cuiabá — parsear com `new Date(ano, mês-1, dia)` em vez de passar string ISO.
- **Filtros:** calendário, clubes e notas usam JS inline (sem bibliotecas) só pra alternar classes e `display: none`. Nada de framework.
- **Página de detalhe de evento:** por ora é um `evento.html` genérico reaproveitado. Pra ter páginas realmente separadas, duplicar o arquivo e trocar os campos — ou migrar depois pra geração estática (Astro, Eleventy) sem mudar o visual.
- **Tabela de transparência vira cards no mobile:** o `<table>` muda `display: block` abaixo de 860px e as células carregam o rótulo em `data-rot` que o CSS imprime antes do valor.
- **Acessibilidade:** `skip-link`, foco visível, `aria-current`, `aria-expanded` no botão de menu, respeita `prefers-reduced-motion`.
- **Status na nav:** o item ativo tem um pequeno `V` angular embaixo que ecoa o símbolo do logo.

## Como deployar no Vercel

1. Suba essa pasta para um repositório Git (GitHub, GitLab ou Bitbucket).
2. Entre em [vercel.com](https://vercel.com) e clique em **Add New → Project**.
3. Selecione o repositório. Framework preset: **Other**. Build command: deixe em branco. Output directory: deixe em branco (raiz).
4. Clique em **Deploy**. Vercel detecta HTML estático e publica em segundos.
5. Em **Settings → Domains**, aponte seu domínio próprio.

Alternativa sem Git: `npx vercel` na raiz da pasta (requer Node e conta Vercel).

## Como editar na prática

- **Mudar cor da marca:** `assets/css/tokens.css`, linhas `--cor-azul`, `--cor-verde`, `--cor-amarelo`. Muda tudo de uma vez.
- **Adicionar um evento no calendário:** copiar um bloco `<section class="timeline-mes">` dentro de `calendario.html` e trocar mês, dia, nome, local e `data-abrangencia` / `data-status`.
- **Adicionar um clube:** copiar um `<article class="clube-card">` em `clubes.html`, preencher `data-nome` e `data-cidade` (sem acento, minúsculas) para o filtro funcionar.
- **Adicionar uma nota:** copiar `<a class="nota-linha">` em `notas.html` e, se quiser conteúdo completo, duplicar o `<article class="nota-detalhe">` com um `id="XXX-ano"` que bata com o `href`.
