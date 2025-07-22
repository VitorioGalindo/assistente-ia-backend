# Usa a imagem Python 3.10 oficial e leve como base. Este é o padrão da indústria.
FROM python:3.10-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala ferramentas de sistema essenciais, como compiladores.
# Isso garante que qualquer biblioteca Python possa ser instalada.
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential && rm -rf /var/lib/apt/lists/*

# Copia apenas o arquivo de requisitos primeiro para otimizar o cache do Docker
COPY requirements.txt ./requirements.txt

# Instala as dependências Python usando o comando mais robusto
RUN python -m pip install --no-cache-dir -r requirements.txt

# Copia o resto da aplicação para o container
COPY . .

# Expõe a porta em que o Gunicorn irá rodar
EXPOSE 8080

# O comando para iniciar a aplicação em produção
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "server:app"]