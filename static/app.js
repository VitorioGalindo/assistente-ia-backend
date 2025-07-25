<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de Assistentes IA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css"> <!-- Certifique-se de que seu style.css esteja no mesmo diretório -->
</head>
<body class="p-4 sm:p-6 lg:p-8">
    <div class="max-w-full mx-auto h-screen flex flex-col">
        <header class="mb-4">
            <h1 class="text-3xl font-bold text-white">Dashboard de Assistentes IA ✨</h1>
            <p class="text-gray-400 mt-1">Selecione um assistente para começar.</p>
        </header>

        <main class="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100%-80px)]">
            <aside id="assistants-sidebar" class="lg:col-span-1 flex flex-col gap-3">
                <!-- Botão para criar novo chat (inicialmente oculto) -->
                <button id="new-chat-btn" class="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mb-4 hidden">
                    + Novo Chat
                </button>
                <!-- Container para a lista de chats -->
                <div id="chat-list-container" class="flex flex-col gap-2 mb-4"></div>
            </aside>

            <!-- Conteúdo principal (chat e arquivos), inicialmente oculto -->
            <div id="main-content" class="lg:col-span-4 flex flex-col gap-6 h-full hidden">
                
                <!-- Painel do Chat -->
                <div id="chat-pane" class="card flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <!-- Título do Chat e Botão de Excluir Chat -->
                        <div class="flex items-center gap-3">
                            <h2 id="chat-title" class="text-xl font-semibold text-white">Chat</h2>
                            <button id="delete-chat-btn" class="text-gray-400 hover:text-red-500 transition-colors hidden" title="Excluir este chat">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        <!-- Botão para expandir/recolher o painel do chat -->
                        <button id="toggle-chat-pane" class="pane-toggle-btn" title="Expandir/Recolher">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                        </button>
                    </div>
                    <div id="chat-messages-wrapper" class="flex-grow overflow-hidden flex flex-col">
                        <div id="chat-messages" class="flex-grow overflow-y-auto p-4 space-y-4"></div>
                        <div id="chat-thinking-indicator" class="p-4 text-gray-400 hidden"><p>Assistente está digitando...</p></div>
                        <div class="p-4 border-t border-gray-700">
                            <div class="flex items-center gap-3">
                                <textarea id="chat-input" class="table-input flex-grow" placeholder="Digite sua mensagem... (Shift+Enter para nova linha)" rows="1"></textarea>
                                <button id="send-button" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Painel de Arquivos (Ambiente de Trabalho) -->
                <div id="files-pane" class="card flex flex-col">
                     <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-white">Ambiente de Trabalho</h2>
                        <!-- Botão para expandir/recolher o painel de arquivos -->
                        <button id="toggle-files-pane" class="pane-toggle-btn" title="Expandir/Recolher">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                        </button>
                    </div>
                    <div id="file-list-wrapper" class="flex-grow overflow-hidden flex flex-col">
                        <div id="file-list" class="overflow-y-auto pr-2"></div>
                        <div class="mt-4 pt-4 border-t border-gray-700">
                            <div class="flex gap-3">
                                <label for="file-upload" class="flex-grow text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer">
                                    Adicionar Arquivo
                                </label>
                                <input type="file" id="file-upload" class="hidden">
                                <!-- Botão para Limpar Todos os Arquivos -->
                                <button id="delete-all-files-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors" title="Excluir todos os arquivos do ambiente">
                                    Limpar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Tela de Boas-Vindas (inicialmente visível) -->
            <div id="welcome-screen" class="lg:col-span-4 card flex items-center justify-center h-full">
                <p class="text-2xl text-gray-500">Por favor, selecione um assistente na barra lateral.</p>
            </div>
        </main>
    </div>
    <script src="app.js"></script> <!-- Link para o arquivo JavaScript -->
</body>
</html>