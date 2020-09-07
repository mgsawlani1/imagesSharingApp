import { html, LitElement } from '@polymer/lit-element';
class Heading extends LitElement {
  render() {
    return html` <h1>Images Sharing App</h1> `;
  }
}
customElements.define('app-head', Heading);
