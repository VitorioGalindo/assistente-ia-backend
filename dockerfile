# Usa a imagem Python oficial como base
FROM python:3.10-slim

# Define o diretório de trabalho
WORKDIR /app

# --- CORREÇÃO APLICADA AQUI ---
# Instala as ferramentas de sistema (compiladores, etc.) necessárias
# para construir dependências Python mais complexas.
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential && rm -rf /var/lib/apt/lists/*

# Copia e instala as dependências Python
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto da aplicação
COPY . .

# Expõe a porta e define o comando de inicialização com Gunicorn
EXPOSE 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "server:app"]
