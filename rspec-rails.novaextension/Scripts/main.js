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

nova.commands.register("rspec-rails.runCurrentFile", (workspace) => {
  // workspace.showActionPanel("What you wanna do?", { buttons: ['nothing', 'something'] })
//   const issues = new IssueCollection('RSpec Rails');
//   issues.clear();
  console.clear()
  const file = workspace.activeTextEditor.document.path.replace(workspace.path, '.')
  const args = `bundle exec rspec ${file} --color`.split(' ')
//   
  const rspec = new Process("/usr/bin/env", {
    args: args,
    stdio: ['pipe', 'pipe', 'pipe'], // in, out, error
    cwd: nova.workspace.path,
  });
// 
// 
//   const stdOut = rspec.stdio[1].getReader();
//   
//   stdOut.read().then(function processText({ done, value }) {
//     if(done) {
//       console.log("Done!");
//       return;
//     }
//     
//     try {
//       // let str = ''
//       let bytes = new Uint8Array(value);
//       for (var i = 0; i < bytes.byteLength; i++) {
//         console.log(String.fromCharCode(bytes[i]))
//       }
//       // console.log(str)
//     } catch(e) {
//       console.error('oops: ', e)
//     }
//     
//     // console.log(value)
//     
//     return stdOut.read().then(processText);
//   })
// 
//   // console.log(rspec.stdio[1].getReader().getReader())
// 
  rspec.onStdout((x) => {
    console.log(x)
  });
  
  rspec.onStderr((x) => {
    console.error(x)
  });
  
  rspec.start();
})
