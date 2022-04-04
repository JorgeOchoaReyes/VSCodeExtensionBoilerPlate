import * as vscode from 'vscode';
import { HelloWordPanel } from './HelloWorldPanel';
import { SidebarProvider } from './sidebarprovider';


export function activate(context: vscode.ExtensionContext) {

	//Sidebar load
	const sidebarProvider = new SidebarProvider(context.extensionUri); 
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"vsscriptsui-sidebar",
			sidebarProvider
		)
	);

	//Tab load
	let disposable = vscode.commands.registerCommand('vsscriptsui.helloWorld', () => {
		HelloWordPanel.createOrShow(context.extensionUri); 
	});
	context.subscriptions.push(disposable);

	let refresh = vscode.commands.registerCommand('vsscriptsui.refresh', async () => {
		//This for actual tab
		// HelloWordPanel.kill(); 
		// HelloWordPanel.createOrShow(context.extensionUri);
		
		//This is for the sidebar
		await vscode.commands.executeCommand("workbench.action.closeSidebar");
		await vscode.commands.executeCommand("workbench.view.extension.vsscriptsui-sidebar-view")
		setTimeout(() => {vscode.commands.executeCommand(
			"workbench.action.webview.openDeveloperTools"
		);
		}, 500); 
	});
	context.subscriptions.push(refresh);



	// vscode.commands.registerCommand('vsscriptsui.askQuestion', async () => {
	// 	const answer = await vscode.window.showInformationMessage('How was your day?', "good", "bad");

	// 	if(answer === "bad") {
	// 		vscode.window.showInformationMessage('Sorry to hear that!');
	// 	}

	// 	else {
	// 		console.log(answer);
	// 	}

	// });
}

// this method is called when your extension is deactivated
export function deactivate() {}
