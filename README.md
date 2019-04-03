# LinearProgrammingProblemSolver

## Commands to keep structure:

### Create Angular 6 Project

`ng new {projectName} --style=scss --routing`

### Create Module

`ng g m {moduleName} --routing`

### Create Shared Module

`ng g m shared/modules/{moduleName}`

### Create Component

`ng g c {moduleName}/components/{componentName} --module {moduleName}`

### Create Class

`ng g cl {moduleName}/classes/{className}`

### Create Interface

`ng g i {moduleName}/interfaces/{interfaceName}`

### Create Service

`ng g s {moduleName}/services/{serviceName}`

### Create Directive

`ng g d {moduleName}/directives/{directiveName}`

### Create Guard

`ng g g {moduleName}/guards/{guardName}`

By Convention we will add Guards to the `Auth` module.

### Start Development Server

`ng serve --watch`

### Build for production

`npm install`

`ng build --prod --build-optimizer --output-path public --base-href /`

