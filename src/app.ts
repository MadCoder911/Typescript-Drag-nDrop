// Code goes here!

// autobint decorator

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
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
    this.element.id = "user-input";

    // Inputs
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    //
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    //
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    //

    // Attaches Form element to App div
    this.attach();
    this.configure();
  }
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
