//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CXr6X1Wx.js
var manifest = {
	"6b32d6fed5f396a9226fa85eb076e86753742a9d70a4c534d0a90bb90e7d4c31": {
		functionName: "leaveTable_createServerFn_handler",
		importer: () => import("./_ssr/table-game.functions-Cb2wlUzX.mjs")
	},
	"b5269c5f506b85a24fe4785674219f2be35ac8b37a0e8ceafbe410f100006911": {
		functionName: "actAtTable_createServerFn_handler",
		importer: () => import("./_ssr/table-game.functions-Cb2wlUzX.mjs")
	},
	"ce6defde78d9f551b049a7d6c727648e4816ee0b23b9e8a8b6945f8cd7a55086": {
		functionName: "sitDownAtTable_createServerFn_handler",
		importer: () => import("./_ssr/table-game.functions-Cb2wlUzX.mjs")
	},
	"d2afbab39247f69a4809efdc381e88fc289ddbae3e9953a499c1b65d0bbbb52b": {
		functionName: "tickTableGame_createServerFn_handler",
		importer: () => import("./_ssr/table-game.functions-Cb2wlUzX.mjs")
	},
	"d3be1dad2b7745a03e80556a51bc3958ad020d97dcd99af6eedfb16b7bb90695": {
		functionName: "getTableGame_createServerFn_handler",
		importer: () => import("./_ssr/table-game.functions-Cb2wlUzX.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
