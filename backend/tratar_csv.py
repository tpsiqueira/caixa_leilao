# -*- coding: latin-1 -*-
import csv
import os
import re

# Define os nomes dos arquivos de entrada e saida
# Altere aqui, se necessario, para corresponder aos nomes dos seus arquivos
INPUT_FILENAME = "lista.csv"
OUTPUT_FILENAME = "lista2.csv"

# Define as linhas a serem removidas (baseado em indice 0)
# Linhas 1, 2 e 4 correspondem aos indices 0, 1, e 3
LINES_TO_REMOVE = [0, 1, 3]

# Define o nome da coluna de Desconto e seu indice (0-based)
# Coluna H e o indice 7
DESCONTO_COLUMN_NAME = "Desconto"
DESCONTO_COLUMN_INDEX = 7 # Default, sera verificado no cabecalho

# Define o nome da coluna Descricao
DESCRICAO_COLUMN_NAME = "Descrição"

# Define o nome da coluna do Numero do Imovel e seu indice (0-based)
NUMERO_IMOVEL_COLUMN_NAME = "Nº do imóvel"
NUMERO_IMOVEL_COLUMN_INDEX = 0 # Primeira coluna

def format_numero_imovel(numero_str):
    """Formata o numero do imovel para o padrao 000000000-0."""
    if not numero_str or not isinstance(numero_str, str):
        return numero_str # Retorna original se invalido ou nao string
    
    # Remove caracteres nao numericos e espacos
    cleaned_numero = re.sub(r'\D', "", numero_str.strip())
    
    if not cleaned_numero: # Se ficou vazio apos limpar
        return numero_str # Retorna original

    # Garante que tenha no maximo 10 digitos (9 antes do hifen, 1 depois)
    if len(cleaned_numero) > 10:
        cleaned_numero = cleaned_numero[:10]
    
    # Preenche com zeros a esquerda para ter 10 digitos
    padded_numero = cleaned_numero.zfill(10)
    
    # Insere o hifen na posicao correta
    formatted_numero = f"{padded_numero[:-1]}-{padded_numero[-1]}"
    return formatted_numero

def process_csv(input_path, output_path):
    """
    Processa o arquivo CSV realizando as seguintes operacoes:
    1. Remove linhas especificas.
    2. Formata a primeira coluna (Nº do imóvel) para o padrao 000000000-0.
    3. Substitui ponto por virgula na coluna de Desconto.
    4. Cria uma nova coluna 'Tipo' apos a coluna 'Descricao',
       extraindo o valor da coluna 'Descricao' antes da primeira virgula.
    Utiliza encoding 'latin1' e delimitador ";".
    """
    print(f"Iniciando processamento do arquivo: {input_path}")
    
    # Etapa 1: Remover linhas especificas
    temp_data_step1 = []
    try:
        with open(input_path, 'r', encoding='latin1', newline='') as infile:
            reader = csv.reader(infile, delimiter=';')
            for i, row in enumerate(reader):
                if i not in LINES_TO_REMOVE:
                    temp_data_step1.append(row)
        print(f"Etapa 1: Linhas {LINES_TO_REMOVE} removidas com sucesso.")
    except FileNotFoundError:
        print(f"Erro: Arquivo de entrada '{input_path}' nao encontrado.")
        return
    except Exception as e:
        print(f"Erro ao remover linhas: {e}")
        return

    if not temp_data_step1:
        print("Erro: Nenhum dado restante apos a remocao de linhas.")
        return

    # Etapa 2: Substituir ponto por virgula na coluna Desconto
    header_step1 = temp_data_step1[0]
    data_step1 = temp_data_step1[1:]
    temp_data_step2 = [list(header_step1)] # Copia do cabecalho
    
    current_desconto_column_index = DESCONTO_COLUMN_INDEX
    try:
        current_desconto_column_index = header_step1.index(DESCONTO_COLUMN_NAME)
        print(f"Coluna '{DESCONTO_COLUMN_NAME}' encontrada no indice {current_desconto_column_index}.")
    except ValueError:
        print(f"Aviso: Coluna '{DESCONTO_COLUMN_NAME}' nao encontrada pelo nome no cabecalho. Usando indice padrao {DESCONTO_COLUMN_INDEX} ('{header_step1[DESCONTO_COLUMN_INDEX] if len(header_step1) > DESCONTO_COLUMN_INDEX else 'N/A'}').")
        if not (len(header_step1) > DESCONTO_COLUMN_INDEX):
             print(f"Erro: O indice padrao {DESCONTO_COLUMN_INDEX} para a coluna '{DESCONTO_COLUMN_NAME}' esta fora dos limites do cabecalho ({len(header_step1)} colunas).")
             return

    for original_row in data_step1:
        row = list(original_row) # Trabalha com uma copia da linha
        if len(row) > current_desconto_column_index:
            row[current_desconto_column_index] = row[current_desconto_column_index].replace('.', ',')
        temp_data_step2.append(row)
    print(f"Etapa 2: Ponto substituido por virgula na coluna '{DESCONTO_COLUMN_NAME}' (indice {current_desconto_column_index}).")

    # Etapa 3: Criar coluna Tipo apos Descricao
    header_step2 = temp_data_step2[0]
    data_step2 = temp_data_step2[1:]
    temp_data_step3 = [list(header_step2)] # Copia do cabecalho

    descricao_column_index_actual = -1
    try:
        descricao_column_index_actual = header_step2.index(DESCRICAO_COLUMN_NAME)
    except ValueError:
        possible_descricao_names = ["Descricao", "descrição", "descricao"]
        found_descricao = False
        for i, col_name in enumerate(header_step2):
            if col_name in possible_descricao_names:
                descricao_column_index_actual = i
                found_descricao = True
                print(f"Coluna 'Descricao' encontrada como '{col_name}' no indice {descricao_column_index_actual}.")
                break
        if not found_descricao:
            if len(header_step2) > 8: # Indice 8 foi o inferido anteriormente
                descricao_column_index_actual = 8 
                print(f"Aviso: Coluna '{DESCRICAO_COLUMN_NAME}' (ou variacoes) nao encontrada. Usando indice 8 ('{header_step2[8]}') como fallback.")
            else:
                print(f"Erro: Coluna '{DESCRICAO_COLUMN_NAME}' (ou variacoes) nao encontrada e o cabecalho tem menos de 9 colunas. Nao e possivel criar a coluna 'Tipo'.")
                return
    else:
        print(f"Coluna '{DESCRICAO_COLUMN_NAME}' encontrada no indice {descricao_column_index_actual}.")

    new_header = header_step2[:descricao_column_index_actual + 1] + ["Tipo"] + header_step2[descricao_column_index_actual + 1:]
    temp_data_step3[0] = new_header # Atualiza o cabecalho em temp_data_step3

    for original_row in data_step2:
        row = list(original_row) # Trabalha com uma copia da linha
        if len(row) > descricao_column_index_actual:
            descricao_content = row[descricao_column_index_actual]
            tipo_content = descricao_content.split(',', 1)[0].strip()
            new_row_processed = row[:descricao_column_index_actual + 1] + [tipo_content] + row[descricao_column_index_actual + 1:]
            temp_data_step3.append(new_row_processed)
        else:
            new_row_processed = row[:descricao_column_index_actual + 1] + [""] + row[descricao_column_index_actual + 1:]
            while len(new_row_processed) < len(new_header):
                new_row_processed.append("")
            temp_data_step3.append(new_row_processed)
    print(f"Etapa 3: Coluna 'Tipo' criada apos a coluna '{DESCRICAO_COLUMN_NAME}' (indice {descricao_column_index_actual}).")

    # Etapa 4: Formatar a primeira coluna (Nº do imóvel)
    final_processed_rows = [list(temp_data_step3[0])] # Copia do cabecalho
    numero_imovel_idx_actual = NUMERO_IMOVEL_COLUMN_INDEX
    try:
        numero_imovel_idx_actual = final_processed_rows[0].index(NUMERO_IMOVEL_COLUMN_NAME)
        print(f"Coluna '{NUMERO_IMOVEL_COLUMN_NAME}' encontrada no indice {numero_imovel_idx_actual} para formatacao.")
    except ValueError:
        print(f"Aviso: Coluna '{NUMERO_IMOVEL_COLUMN_NAME}' nao encontrada pelo nome no cabecalho para formatacao. Usando indice padrao {NUMERO_IMOVEL_COLUMN_INDEX} ('{final_processed_rows[0][NUMERO_IMOVEL_COLUMN_INDEX] if len(final_processed_rows[0]) > NUMERO_IMOVEL_COLUMN_INDEX else 'N/A'}').")
        if not (len(final_processed_rows[0]) > NUMERO_IMOVEL_COLUMN_INDEX):
            print(f"Erro: O indice padrao {NUMERO_IMOVEL_COLUMN_INDEX} para a coluna '{NUMERO_IMOVEL_COLUMN_NAME}' esta fora dos limites do cabecalho ({len(final_processed_rows[0])} colunas).")
            return

    for original_row in temp_data_step3[1:]:
        row = list(original_row) # Trabalha com uma copia da linha
        if len(row) > numero_imovel_idx_actual:
            row[numero_imovel_idx_actual] = format_numero_imovel(row[numero_imovel_idx_actual])
        final_processed_rows.append(row)
    print(f"Etapa 4: Primeira coluna ('{NUMERO_IMOVEL_COLUMN_NAME}') formatada para o padrao 000000000-0.")

    # Etapa 5: Salvar o arquivo final
    try:
        with open(output_path, 'w', encoding='latin1', newline='') as outfile:
            writer = csv.writer(outfile, delimiter=';')
            writer.writerows(final_processed_rows)
        print(f"Processamento concluido. Arquivo salvo como: {output_path}")
    except Exception as e:
        print(f"Erro ao salvar o arquivo final: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(script_dir, INPUT_FILENAME)
    output_file_path = os.path.join(script_dir, OUTPUT_FILENAME)
    
    process_csv(input_file_path, output_file_path)

