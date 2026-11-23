# Site da FMTTM

Site institucional da **Federação Matogrossense de Tênis de Mesa — FMTTM** (CNPJ 07.898.945/0001-11, e-mail fedmt@cbtm.org.br, Instagram @tenisdemesamt). A sigla correta é FMTTM, nunca "FTMMT".

O que falta fazer está em @PENDENCIAS.md. Ao concluir um item, tire-o de lá no mesmo commit.

## Como o projeto funciona

- HTML, CSS e JS puros, sem build e sem framework. Para ver o site, abra `index.html` no navegador.
- Publicação: todo `git push` na branch `main` do GitHub (`Daniel-Bucair/fmttm-site`) publica sozinho no Vercel. Não há etapa de revisão, então confira no navegador antes de enviar.
- Trabalhe sempre a partir da versão mais nova: `git pull` antes de começar.
- Mensagens de commit em português, no padrão `feat:`, `fix:`, `style:`, `chore:`.

## Regras que já custaram retrabalho

- **Cache.** O `vercel.json` manda o navegador guardar tudo de `/assets/` por 1 ano. Ao alterar um CSS, JS, imagem ou PDF que já existe, aumente o `?v=` no link que aponta para ele (em todas as páginas que o usam), ou o visitante continua vendo a versão antiga.
- **CSS do cabeçalho é duplicado.** Cada página interna tem seu próprio CSS em `assets/css/`. O cabeçalho com foto de fundo já existe em Clubes (`.pagina-cabecalho--foto` e `.pagina-cabecalho__foto` em `assets/css/clubes.css`); para outra página, copie as duas regras para o CSS dela.
- **Fotos.** Converter para `.webp`, horizontais, com `alt` descritivo. Evitar artes com texto e fotos com marca-d'água de fotógrafo.
- **Eventos.** Cada evento tem página própria (`evento-copa-mt-3.html`, `evento-liga-mt-4.html`...). O `evento.html` genérico hoje é a Copa MT 4ª etapa. Um evento aparece em quatro lugares, que precisam mudar juntos: `index.html` (faixa do topo e flyers), `eventos.html`, `calendario.html` e a página do evento.
- **Circulares e resultados** ficam em `assets/docs/circulares/` e `assets/docs/resultados/`, com nome no padrão dos que já estão lá.
- **Convênios** da Transparência ficam no array `CONVENIOS`, no script do fim de `transparencia.html`.

## Dados pessoais

Os documentos da federação trazem muito dado pessoal. Não publicar: atas com e-mail ou IP de assinantes e listas de presença, certificados de árbitros, documentos de clubes, planilhas de registro de atletas (TRA). Na dúvida, pergunte antes de colocar o arquivo no site.

## Decisões já tomadas

- O clube de Primavera do Leste aparece como **AER** no site, embora na CBTM o registro seja "Primavera Atlético Clube". É o mesmo clube.
- Os cards de clubes não mostram quantidade de atletas.
- Ara-Xingu, Tênis de Mesa Virtual e AABB Cuiabá não entram na lista de clubes.
- Circulares de eventos já realizados ficam com o PDF que está no ar; só eventos futuros precisam da versão oficial.
- A página de Transparência segue o modelo de https://idecmt.com/transparencia.
