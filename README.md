# Site TN Estofados — catálogo, orçamento e privacidade

Site responsivo para a TN Estofados, pronto para publicar na Vercel, com catálogo dinâmico, imagens em cada produto, carrinho de orçamento, configurador visual, upload de fotos, contrato de compra, Política de Privacidade e canal de solicitações LGPD.

## Recursos principais

- catálogo com imagens dos produtos;
- filtros, busca e modal de detalhes;
- carrinho para pedido de orçamento;
- configurador visual com medidas, tecido, espuma, estrutura, pés, almofadas e extras;
- upload opcional de foto do ambiente e do estofado atual;
- envio por WhatsApp;
- envio real por formulário usando Vercel + Resend;
- confirmação por e-mail ao cliente quando ele informa um endereço válido;
- protocolo de orçamento;
- Política de Privacidade e formulário para direitos LGPD;
- proteção contra spam, limitação básica de tentativas, validação de anexos e origem;
- cabeçalhos de segurança no `vercel.json`;
- nenhuma fonte externa ou pixel de publicidade na versão atual.

## Publicar na Vercel

1. Crie um repositório e envie todos os arquivos desta pasta.
2. Na Vercel, clique em **Add New > Project**.
3. Importe o repositório.
4. Use **Framework Preset: Other**.
5. Não é necessário comando de build.
6. Configure as variáveis de ambiente e publique.

## Variáveis de ambiente

- `RESEND_API_KEY`
- `QUOTE_RECEIVER_EMAIL`
- `QUOTE_SENDER_EMAIL`
- `PRIVACY_RECEIVER_EMAIL`
- `ALLOWED_ORIGIN` — exemplo: `https://www.tnestofados.com.br`
- `QUOTE_BCC_EMAIL` — opcional

Após alterar uma variável, faça um novo deploy.

## Limites dos anexos

- até 2 fotos;
- até 2 MB por arquivo;
- total máximo de 4 MB;
- formatos PNG, JPG/JPEG e WEBP;
- os tipos e tamanhos são verificados no navegador e novamente no servidor.

## Arquivos principais

- `index.html`: conteúdo principal e formulários de orçamento.
- `politica-de-privacidade.html`: transparência, direitos e canal LGPD.
- `contrato-de-compra.html`: compra, entrega, trocas e devoluções.
- `app.js`: catálogo, configurador e envio dos orçamentos.
- `privacy.js`: formulário de direitos do titular.
- `api/request-quote.js`: recebimento seguro de orçamentos.
- `api/privacy-request.js`: recebimento de solicitações LGPD.
- `lib/server-utils.js`: validação, origem, arquivos, protocolos e rate limit básico.
- `vercel.json`: segurança, cache e configuração da Vercel.
- `GUIA-CONFORMIDADE-LGPD.md`: procedimentos internos necessários.

## Observação importante

O código reduz lacunas de transparência e segurança, mas nenhuma página torna uma empresa automaticamente “legalizada”. A empresa precisa seguir na prática os prazos de retenção, atender os titulares, restringir acessos, manter dados empresariais corretos, responder a incidentes e revisar o conteúdo quando a operação mudar.
