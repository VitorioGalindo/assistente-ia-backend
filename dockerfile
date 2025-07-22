# Usa a imagem Python oficial como base
FROM python:3.10-slim

# Define o diretório de trabalho
WORKDIR /app

# Instala ferramentas de sistema essenciais (boa prática, mantém do passo anterior)
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de dependências
COPY requirements.txt ./requirements.txt

# --- CORREÇÃO APLICADA AQUI ---
# Usa o comando explícito 'python -m pip' para garantir que o pip seja encontrado
RUN python -m pip install --no-cache-dir -r requirements.txt

# Copia o resto da aplicação
COPY . .

# Expõe a porta e define o comando de inicialização com Gunicorn
EXPOSE 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "server:app"]