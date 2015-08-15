window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container." },
    { handler: "silence", matchMessage: "In Ember 2.0 service factories must have an `isServiceFactory` property set to true. You registered (unknown mixin) as a service factory. Either add the `isServiceFactory` property to this factory or extend from Ember.Service." },
    { handler: "silence", matchMessage: "Ember.View is deprecated. Consult the Deprecations Guide for a migration strategy." }
  ]
};
