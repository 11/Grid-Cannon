import { css, html, LitElement, } from 'lit'

export class WebLink extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .link {
      width: 100%;
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      font-weight: 300;
      padding: 1rem 2rem;
      border: 2px solid black;
      border-radius: 2rem;
      text-align: center;
    }

    .primary {
      background-color: black;
      color: white;
      text-decoration: underline
    }

    .secondary {
      background: white;
      color: black;
    }
  `

  static properties = {
    href: { type: String },
    target: { type: String },
    rel: { type: String },
    usePrimary: { type: Boolean },
  }

  href: string
  target: string
  rel: string
  usePrimary: boolean

  constructor() {
    super()
    this.href = '/'
    this.target = ''
    this.rel = ''
    this.usePrimary = true
  }

  render() {
    return html`
      <a
        href='${this.href}'
        target='${this.target}'
        rel='${this.rel}'
        class='link ${this.usePrimary ? 'primary' : 'secondary'}'
      >
        <slot></slot>
      </a>
    `
  }
}

customElements.define('web-link', WebLink)
