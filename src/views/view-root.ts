import { LitElement, html, css } from 'lit-element'
import { Router } from '@vaadin/router'
import { isNil } from 'lodash'
import { ROUTING_TABLE } from '@/routes'

export class ViewRoot extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 1rem;
        width: 100%;
        height: 100%;
      }
    `
  }

  setRoutes = (): void => {
    console.log('made it here')
    const slot = this.shadowRoot?.querySelector('slot')
    if (isNil(slot)) {
      throw new Error('Slot not found')
    }

    const router = new Router(slot)
    router.setRoutes(ROUTING_TABLE)
  }

  firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    console.log('made it here')
    super.firstUpdated(_changedProperties)
    this.setRoutes()
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('view-root', ViewRoot)

declare global {
  interface HTMLElementTagNameMap {
    'view-root': ViewRoot;
  }
}
