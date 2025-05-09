# -*- coding: utf-8 -*-
import pandas as pd
import os
import sys

# Tentativa de ajustar o sys.path para importações relativas caso o script seja executado diretamente
# e o diretório "backend" não esteja no PYTHONPATH.
# Isso assume que "import_csv.py" está em "backend/jobs/" e "database" está em "backend/database/".
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.join(SCRIPT_DIR, "..") # Este seria o diretório "backend"
if PARENT_DIR not in sys.path:
    sys.path.append(PARENT_DIR)

try:
    from sqlalchemy.orm import Session
    from database.connection import SessionLocal, init_db
    from database.models import Imovel
except ImportError as e:
    print(f"❌ Erro ao importar módulos do banco de dados: {e}")
    print("   Certifique-se de que o script está sendo executado no contexto correto do projeto")
    print("   ou que o diretório \"backend\" está no PYTHONPATH.")
    sys.exit(1)

# Constantes
CSV_FILENAME = "lista2.csv" # Arquivo CSV já tratado
COLUNA_NUMERO_IMOVEL_CSV = " N° do imóvel" # Nome exato da coluna no CSV, incluindo espaço inicial se houver

def importar_lista2_para_db(caminho_csv: str):
    """
    Importa dados do arquivo CSV "lista2.csv" (já tratado) para o banco de dados PostgreSQL.
    Assume que "lista2.csv" tem encoding "latin1", delimitador ";", e a primeira coluna "Nº do imóvel" já está formatada.
    """
    print(f"🔄 Lendo CSV: {caminho_csv}")
    try:
        df = pd.read_csv(caminho_csv, sep=";", encoding="latin1", dtype=str, keep_default_na=False)
    except FileNotFoundError:
        print(f"❌ Erro: Arquivo CSV \"{caminho_csv}\" não encontrado.")
        return
    except Exception as e:
        print(f"❌ Erro ao ler o arquivo CSV \"{caminho_csv}\": {e}")
        return

    print(f"📋 Colunas lidas do CSV: {list(df.columns)}")
    if COLUNA_NUMERO_IMOVEL_CSV not in df.columns:
        print(f"❌ ERRO CRÍTICO: A coluna esperada \"{COLUNA_NUMERO_IMOVEL_CSV}\" não foi encontrada no arquivo CSV.")
        print(f"   Verifique o nome da primeira coluna no arquivo \"{CSV_FILENAME}\".")
        return

    # As linhas de depuração para imprimir valores da coluna "Nº do imóvel" foram removidas nesta versão final.

    try:
        init_db()  # Garante que as tabelas existam
        session: Session = SessionLocal()
        print("📦 Iniciando importação para o banco de dados...")
    except Exception as e:
        print(f"❌ Erro ao inicializar a conexão com o banco de dados: {e}")
        return

    registros_processados = 0
    registros_com_erro_geral = 0
    registros_numero_imovel_vazio = 0

    for index, row in df.iterrows():
        try:
            def get_value(r, col_name):
                val = r.get(col_name)
                # pd.isna() pode não funcionar como esperado se keep_default_na=False e os valores são strings vazias.
                # Melhor verificar se é None ou string vazia após strip.
                if val is None or str(val).strip() == "":
                    return None
                return str(val).strip()

            numero_imovel_val = get_value(row, COLUNA_NUMERO_IMOVEL_CSV)

            if not numero_imovel_val:
                registros_numero_imovel_vazio += 1
                continue
            
            imovel_data = {
                "numero_imovel": numero_imovel_val,
                "uf": get_value(row, "UF"),
                "cidade": get_value(row, "Cidade"),
                "bairro": get_value(row, "Bairro"),
                "endereco": get_value(row, "Endereço"),
                "preco": get_value(row, "Preço"),
                "valor_avaliacao": get_value(row, "Valor de avaliação"),
                "desconto": get_value(row, "Desconto"),
                "descricao": get_value(row, "Descrição"),
                "tipo": get_value(row, "Tipo"), # Campo adicionado ao modelo Imovel
                "modalidade": get_value(row, "Modalidade de venda"),
                "link": get_value(row, "Link de acesso")
            }

            imovel = Imovel(**imovel_data)
            session.merge(imovel)
            session.commit()
            registros_processados += 1
        except Exception as e:
            session.rollback()
            print(f"❌ Erro ao processar/inserir linha {index + 2} (Nº Imóvel: {row.get(COLUNA_NUMERO_IMOVEL_CSV, 'N/A')}): {e}")
            registros_com_erro_geral += 1

    session.close()
    print(f"\n🏁 Importação concluída.")
    print(f"   Total de registros lidos do CSV: {len(df)}")
    print(f"   Total de registros processados com sucesso: {registros_processados}")
    if registros_numero_imovel_vazio > 0:
        print(f"   Total de registros pulados (\"{COLUNA_NUMERO_IMOVEL_CSV}\" vazio/ausente): {registros_numero_imovel_vazio}")
    if registros_com_erro_geral > 0:
        print(f"   Total de registros com erro durante o processamento/inserção: {registros_com_erro_geral}")

if __name__ == "__main__":
    # Configura o encoding do stdout para UTF-8, útil para terminais Windows
    if sys.stdout.encoding != 'utf-8' and sys.stdout.isatty():
        try:
            sys.stdout.reconfigure(encoding='utf-8')
            print("ℹ️ Encoding do console configurado para UTF-8.")
        except Exception as e:
            print(f"⚠️ Aviso: Não foi possível reconfigurar o encoding do console para UTF-8: {e}")

    csv_file_path_relative = os.path.join(SCRIPT_DIR, "..", CSV_FILENAME)
    csv_file_path_absolute = os.path.normpath(csv_file_path_relative)

    print(f"📂 Caminho do script: {SCRIPT_DIR}")
    print(f"📄 Caminho do CSV a ser importado: {csv_file_path_absolute}")

    if not os.path.exists(csv_file_path_absolute):
        print(f"❌ ERRO FATAL: O arquivo CSV \"{csv_file_path_absolute}\" não foi encontrado. Verifique o caminho.")
    else:
        importar_lista2_para_db(csv_file_path_absolute)

