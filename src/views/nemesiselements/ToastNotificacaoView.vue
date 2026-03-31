<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import PropsTable from '@/components/PropsTable.vue'
import { RouterLink } from 'vue-router'
import { useToastNotificacao } from 'nemesiselements'

const toast = useToastNotificacao()

const providerSetup = `<!-- App.vue ou layout raiz -->
<script setup>
import { ToastNotificacao } from 'nemesiselements'
<\/script>

<template>
  <ToastNotificacao>
    <RouterView />
  </ToastNotificacao>
</template>`

const composableUsage = `<script setup>
import { useToastNotificacao } from 'nemesiselements'

const toast = useToastNotificacao()

toast.sucesso('Registro salvo com sucesso!')
toast.erro('Não foi possível excluir o registro.')
toast.aviso('Esta ação não pode ser desfeita.')
toast.info('Nova atualização disponível.')
<\/script>`

const mostrarUsage = `// Método genérico — severity manual
toast.mostrar('success', 'Operação concluída!', { life: 3000 })`

const objectDetail = `// Passando objeto com código de erro
toast.erro({ mensagem: 'Servidor indisponível', status_code: 503 })

// String simples também funciona
toast.erro('Algo deu errado.')`

const addDirect = `// Via ref ao componente (sem usar o composable)
const toastRef = ref(null)

toastRef.value.add({
  severity: 'success',
  detail: 'Operação concluída!',
  life: 4000,
  code: 200
})`

const customLife = `// Toast que fecha em 2 segundos
toast.sucesso('Salvo!', { life: 2000 })

// Toast que fecha em 10 segundos
toast.info('Processando em segundo plano...', { life: 10000 })`

const itemProps = [
  { name: 'message', type: 'Object', default: '—', description: 'Obrigatório. Objeto com { severity, detail?, code?, life?, id }.' },
  { name: 'message.severity', type: "'success' | 'error' | 'warn' | 'info'", default: '—', description: 'Tipo do toast. Define cor, ícone e título automático.' },
  { name: 'message.detail', type: 'String', default: '—', description: 'Texto descritivo exibido abaixo do título.' },
  { name: 'message.code', type: 'String | Number', default: 'null', description: 'Código exibido no título ao lado do separador (ex: #503).' },
  { name: 'message.life', type: 'Number', default: '5000', description: 'Tempo em ms até o toast fechar automaticamente.' },
  { name: 'closeCallback', type: 'Function', default: 'null', description: 'Função chamada ao fechar o toast (clique no X ou fim do countdown).' },
  { name: 'dark', type: 'Boolean', default: 'false', description: 'Ativa o tema escuro no toast (fundo #1c1c1e, footer #2c2c2e).' },
  { name: 'showIcon', type: 'Boolean', default: 'true', description: 'Exibe ou oculta o ícone animado de severidade.' },
]

const addOptions = [
  { name: 'severity', type: "'success' | 'error' | 'warn' | 'info'", default: '—', description: 'Obrigatório. Define o tipo visual do toast.' },
  { name: 'detail', type: 'String', default: '—', description: 'Mensagem descritiva exibida no corpo do toast.' },
  { name: 'code', type: 'String | Number', default: 'null', description: 'Código exibido no título (ex: código HTTP). Extraído automaticamente de detail.status_code.' },
  { name: 'life', type: 'Number', default: '5000', description: 'Duração em ms antes do fechamento automático.' },
]

const severities = [
  { value: 'success', cor: '#22c55e', titulo: 'Tudo certo!', dark: '#4ade80' },
  { value: 'error', cor: '#ef4444', titulo: 'Ops! Algo deu errado.', dark: '#f87171' },
  { value: 'warn', cor: '#eab308', titulo: 'Atenção!', dark: '#facc15' },
  { value: 'info', cor: '#3b82f6', titulo: 'Notificação!', dark: '#60a5fa' },
]

const demoButtons = [
  { label: 'Sucesso', action: () => toast.sucesso('Registro salvo com sucesso!'), cls: 'btn-success' },
  { label: 'Erro', action: () => toast.erro({ mensagem: 'Não foi possível concluir a operação.', status_code: 500 }), cls: 'btn-error' },
  { label: 'Aviso', action: () => toast.aviso('Esta ação não pode ser desfeita.'), cls: 'btn-warn' },
  { label: 'Info', action: () => toast.info('Nova atualização disponível.'), cls: 'btn-info' },
]
</script>

<template>
  <div class="doc-content">
    <div class="page-badge">
      <span class="badge badge-purple">NemesisElements</span>
    </div>

    <h1>ToastNotificacao</h1>
    <p>
      Sistema de notificações toast para Vue 3. Funciona via provider + composable:
      <code>ToastNotificacao</code> envolve a aplicação e injeta a API via <code>provide</code>,
      acessível em qualquer componente filho com <code>useToastNotificacao()</code>.
      Os toasts são renderizados via <code>Teleport</code> no <code>body</code>.
    </p>

    <h2>Demonstração</h2>
    <p>Clique nos botões para disparar cada tipo de toast:</p>

    <div class="demo-section demo-dark">
      <div class="demo-label">Preview</div>
      <div class="demo-buttons">
        <button
          v-for="btn in demoButtons"
          :key="btn.label"
          class="demo-btn"
          :class="btn.cls"
          @click="btn.action"
        >
          {{ btn.label }}
        </button>
      </div>
    </div>

    <h2>Configuração do provider</h2>
    <p>Envolva sua aplicação (ou o layout raiz) com <code>ToastNotificacao</code>:</p>
    <CodeBlock :code="providerSetup" language="vue" />

    <h2>Usando o composable</h2>
    <p>Em qualquer componente filho, use <code>useToastNotificacao()</code>:</p>
    <CodeBlock :code="composableUsage" language="vue" />

    <h2>Severidades</h2>
    <p>São 4 tipos disponíveis. O título do toast é gerado automaticamente por severidade:</p>

    <div class="severity-table">
      <div class="severity-row severity-header">
        <span>severity</span>
        <span>Título gerado</span>
        <span>Cor (light)</span>
        <span>Cor (dark)</span>
      </div>
      <div v-for="s in severities" :key="s.value" class="severity-row">
        <code>{{ s.value }}</code>
        <span class="severity-title">{{ s.titulo }}</span>
        <span class="severity-swatch-wrap">
          <span class="severity-swatch" :style="{ background: s.cor }"></span>
          <code class="severity-hex">{{ s.cor }}</code>
        </span>
        <span class="severity-swatch-wrap">
          <span class="severity-swatch" :style="{ background: s.dark }"></span>
          <code class="severity-hex">{{ s.dark }}</code>
        </span>
      </div>
    </div>

    <h2>Opções do método add()</h2>
    <p>
      Todas as opções passadas ao composable (<code>sucesso</code>, <code>erro</code>, <code>aviso</code>, <code>info</code>, <code>mostrar</code>)
      ou diretamente ao <code>add()</code> via ref:
    </p>
    <PropsTable :props="addOptions" />

    <h2>Props do ToastNotificacaoItem</h2>
    <p>
      <code>ToastNotificacaoItem</code> é o toast individual. Normalmente não é instanciado diretamente —
      o <code>ToastNotificacao</code> faz isso internamente — mas suas props são úteis para uso avançado:
    </p>
    <PropsTable :props="itemProps" />

    <h2>Passando objeto de erro</h2>
    <p>
      O composable aceita string simples ou objeto com <code>mensagem</code> e <code>status_code</code>.
      O código é extraído automaticamente e exibido no título do toast:
    </p>
    <CodeBlock :code="objectDetail" language="js" />

    <h2>Customizando o tempo de vida</h2>
    <p>Passe um segundo argumento de opções para sobrescrever o <code>life</code> padrão de 5000ms:</p>
    <CodeBlock :code="customLife" language="js" />

    <h2>Método mostrar()</h2>
    <p>Para disparar com severity manual, use <code>mostrar(severity, detail, options)</code>:</p>
    <CodeBlock :code="mostrarUsage" language="js" />

    <h2>Método add() direto via ref</h2>
    <p>Alternativa ao composable, útil fora da árvore de componentes Vue:</p>
    <CodeBlock :code="addDirect" language="js" />

    <h2>Comportamento</h2>
    <ul>
      <li>Toasts são empilhados no canto <strong style="color: var(--color-text)">superior direito</strong> com gap de 8px.</li>
      <li>O countdown no rodapé pode ser <strong style="color: var(--color-text)">pausado e retomado</strong> clicando no botão de pausa.</li>
      <li>A barra de progresso avança linearmente até o fechamento automático.</li>
      <li>Se <code>ToastNotificacao</code> não estiver na árvore, o composable emite <code>console.warn</code> e retorna funções vazias.</li>
    </ul>

    <div class="prev-links">
      <RouterLink to="/nemesiselements/instalacao" class="prev-link">
        <div class="prev-label">Anterior</div>
        <div class="prev-title">← Instalação</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-badge {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.demo-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;
}

.btn-success {
  background: rgba(34, 197, 94, 0.12);
  color: #4ade80;
  border-color: rgba(34, 197, 94, 0.3);
}
.btn-success:hover { background: rgba(34, 197, 94, 0.2); }

.btn-error {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border-color: rgba(239, 68, 68, 0.3);
}
.btn-error:hover { background: rgba(239, 68, 68, 0.2); }

.btn-warn {
  background: rgba(234, 179, 8, 0.12);
  color: #facc15;
  border-color: rgba(234, 179, 8, 0.3);
}
.btn-warn:hover { background: rgba(234, 179, 8, 0.2); }

.btn-info {
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.3);
}
.btn-info:hover { background: rgba(59, 130, 246, 0.2); }

.severity-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 1rem 0 2rem;
  font-size: 0.875rem;
}

.severity-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.severity-row:last-child {
  border-bottom: none;
}

.severity-row > * {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
}

.severity-header {
  background: var(--color-surface-2);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.severity-title {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.severity-swatch-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.severity-swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.severity-hex {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.prev-links {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.prev-link { color: inherit; }

.prev-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.prev-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-accent-2);
}

.prev-link:hover .prev-title { text-decoration: underline; }
</style>
