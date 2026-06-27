# Guia operacional de privacidade e LGPD — TN Estofados

Este arquivo complementa o código do site. A conformidade depende de práticas reais da empresa, não apenas da publicação das páginas.

## 1. Variáveis de ambiente obrigatórias na Vercel

- `RESEND_API_KEY`: chave do Resend.
- `QUOTE_RECEIVER_EMAIL`: e-mail interno que recebe os orçamentos.
- `QUOTE_SENDER_EMAIL`: remetente validado no Resend.
- `PRIVACY_RECEIVER_EMAIL`: e-mail restrito que recebe solicitações LGPD. Se não configurado, será usado `QUOTE_RECEIVER_EMAIL`.
- `ALLOWED_ORIGIN`: domínio público do site, por exemplo `https://www.tnestofados.com.br`. Para mais de um domínio, separar por vírgula.
- `QUOTE_BCC_EMAIL`: opcional.

## 2. Controles mínimos antes de publicar

- Ativar autenticação em dois fatores na Vercel, Resend e e-mail da empresa.
- Restringir o acesso aos e-mails de orçamento e privacidade somente a pessoas autorizadas.
- Confirmar se razão social, CNPJ, endereço, telefone e demais dados do site coincidem com os registros oficiais.
- Testar o formulário de orçamento, a confirmação ao cliente e o formulário de privacidade.
- Manter HTTPS ativo; a Vercel faz isso automaticamente em domínios corretamente configurados.
- Configurar proteção contra abuso no painel da Vercel, quando disponível. O código possui limitação básica, mas limites distribuídos exigem firewall ou armazenamento centralizado.

## 3. Retenção e eliminação

- Orçamentos não convertidos: revisar para exclusão ou anonimização em até 12 meses após a última interação.
- Fotos de ambientes e estofados: excluir quando não forem mais necessárias para orçamento, execução, garantia ou defesa de direitos.
- Contratos, comprovantes, notas e registros de pedidos: manter pelos prazos legais e contábeis aplicáveis.
- Solicitações LGPD: guardar o protocolo e as providências adotadas pelo período necessário para prestação de contas e defesa de direitos.
- Registrar a data de exclusão e a pessoa responsável.

## 4. Atendimento aos titulares

Ao receber uma solicitação pelo protocolo LGPD:

1. Confirmar o recebimento.
2. Verificar a identidade de maneira proporcional, sem pedir mais dados do que o necessário.
3. Localizar os dados nos e-mails, arquivos, conversas e sistemas usados pela empresa.
4. Avaliar o pedido conforme a LGPD e eventuais obrigações de retenção.
5. Responder pelo canal informado pelo titular.
6. Registrar data, decisão, justificativa e medidas executadas.

## 5. Incidentes de segurança

Em caso de envio para pessoa errada, conta invadida, perda de aparelho, exposição pública ou outro incidente:

1. Conter o acesso imediatamente.
2. Alterar senhas e revogar sessões comprometidas.
3. Identificar quais dados e titulares foram afetados.
4. Registrar causa, período, medidas tomadas e riscos.
5. Avaliar a necessidade de comunicação aos titulares e à ANPD conforme a regulamentação vigente.
6. Preservar evidências e corrigir a falha.

## 6. Prestadores utilizados

Manter uma lista atualizada dos serviços que tratam dados em nome da empresa, incluindo:

- Vercel: hospedagem e funções serverless.
- Resend: envio de e-mails.
- Provedor de e-mail da empresa: armazenamento das mensagens.
- WhatsApp/Meta: somente quando o usuário escolhe esse canal.

Registrar finalidade, dados envolvidos, localização do tratamento, medidas de segurança e forma de encerramento/exclusão.

## 7. Publicidade e cookies

A versão atual não inclui analytics ou pixels publicitários. Antes de adicionar Google Analytics, Meta Pixel, Google Ads, TikTok Pixel ou tecnologia semelhante:

- atualizar a Política de Privacidade;
- mapear os fornecedores e transferências;
- implementar painel de preferências e bloqueio prévio das tecnologias não essenciais;
- permitir rejeição tão fácil quanto aceitação.

## 8. Revisões

- Revisar a política ao alterar formulários, fornecedores, finalidade, prazo de retenção ou forma de pagamento.
- Manter a versão antiga arquivada quando houver mudança relevante.
- Solicitar revisão jurídica profissional antes de iniciar checkout com pagamento ou campanhas de marketing baseadas nos dados coletados.
