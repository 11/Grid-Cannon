import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export class TestElement extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	@property() name = 'World';

	render() {
		return html`<h1>Hello, ${this.name}</h1>`;
	}
}

customElements.define('test-element', TestElement)
