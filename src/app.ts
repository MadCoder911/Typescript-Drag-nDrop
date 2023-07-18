// Code goes here!

//Validation

const validate = (titleArr: string[], minLength: number) => {
  let stop: boolean = false;
  // Check for the people number
  if (+titleArr[2] < 1 || +titleArr[2] > 5) {
    stop = true;
    return stop;
  }
  //Check for array pieces length
  for (let i = 0; i < titleArr.length - 1; i++) {
    if (titleArr[i].length < minLength) {
      stop = true;
      break;
    }
  }

  return stop;
};

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
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
  //
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    //
    //
    //
    if (validate([enteredTitle, enteredDescription, enteredPeople], 5)) {
      alert("invalid input");

      //
    } else {
      this.clearInputs();
      return [enteredDescription, enteredDescription, +enteredPeople];
    }
  }
  //
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
