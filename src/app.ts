// Code goes here!
// Project State Management
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();
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

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];
  constructor(private type: "active" | "finished") {
    // Input template
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    // App div
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];
    //List element
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLTableSectionElement;
    this.element.id = `${this.type}-projects`;
    //
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem;
      listEl?.appendChild(listItem);
    }
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + `Projects`;
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
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
      projectState.addProject(title, desc, people);
      this.clearInputs();
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
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
