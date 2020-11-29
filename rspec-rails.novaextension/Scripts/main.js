exports.activate = () => { }

exports.deactivate = () => { }

nova.commands.register("rspec-rails.toggleSpecFile", (workspace) => {
  console.log('neat!')
  const documentPath = nova.path.split(workspace.activeTextEditor.document.path)
  const workspacePath = nova.path.split(workspace.path)
  
  const directory = documentPath[workspacePath.length]
  const filename = documentPath[documentPath.length-1]
  
  if(directory !== 'app' && directory !== 'spec') {
    console.warn(
      `Not an app/ or spec/ file: ${workspace.activeTextEditor.document.path}`
    )
  }
  
  documentPath[workspacePath.length] = directory === 'spec' ? 'app' : 'spec'
  documentPath[documentPath.length-1] = filename.endsWith('_spec.rb') ? filename.replace('_spec.rb', '.rb') : filename.replace('.rb', '_spec.rb')
  
  workspace.openFile(nova.path.join(...documentPath))
})
