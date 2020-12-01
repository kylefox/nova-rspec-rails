exports.activate = () => { }

exports.deactivate = () => { }

nova.commands.register("rspec-rails.toggleSpecFile", (editor) => {
  const documentPath = nova.path.split(editor.document.path)
  const workspacePath = nova.path.split(nova.workspace.path)
  
  const directory = documentPath[workspacePath.length]
  const filename = documentPath[documentPath.length-1]
  
  if(directory !== 'app' && directory !== 'spec') {
    console.warn(
      `Not an app/ or spec/ file: ${workspace.activeTextEditor.document.path}`
    )
  }
  
  documentPath[workspacePath.length] = directory === 'spec' ? 'app' : 'spec'
  documentPath[documentPath.length-1] = filename.endsWith('_spec.rb') ? filename.replace('_spec.rb', '.rb') : filename.replace('.rb', '_spec.rb')
  
  nova.workspace.openFile(nova.path.join(...documentPath))
})

nova.commands.register("rspec-rails.runCurrentFile", (editor) => {
  const file = editor.document.path.replace(nova.workspace.path, '.')
  const args = `bundle exec rspec ${file} --color`.split(' ')
  
  const rspec = new Process("/usr/bin/env", {
    args: args,
    cwd: nova.workspace.path,
  });

  rspec.onStdout((x) => {
    console.log(x)
  });
  
  rspec.onStderr((x) => {
    console.error(x)
  });
  
  rspec.onDidExit((status) => {
    console.log(`Finished with status ${status}`)
  });
    
  console.clear()
  console.log(`Starting: ${args.join(' ')}`)
  rspec.start();
})
