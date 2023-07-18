// Code goes here!
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  constructor() {
    // Input template
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    // App div
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //Input template content
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    //Form element
    this.element = importedNode.firstElementChild as HTMLFormElement;

    // Attaches Form element to App div
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
