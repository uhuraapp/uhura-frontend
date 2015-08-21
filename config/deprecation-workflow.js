window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "log", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container." }, // need update simple-auth
  ]
};
