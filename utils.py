import numpy as np
from sklearn.metrics import r2_score, mean_absolute_error


def prepare_data(data_csv, base_url, mode='val', thres=0.0):
    columns = list(data_csv.columns)
    urls = []
    for i in range(len(data_csv)):
        for j in range(len(columns[3:4])):
            tmp = data_csv.iloc[i, 3 + j].split("/")
            try:
                dice_0 = float(tmp[0])
                dice_1 = float(tmp[1])
                tmp = f"{float(tmp[0]):.3f} / {float(tmp[1]):.3f}"
                
                url = f"./template.html?base_url={base_url}&sid={data_csv.iloc[i, 0]}&id={data_csv.iloc[i, 1]}&slice={data_csv.iloc[i, 2]}&mode={mode}"
                url += f"&Diff_Dice={data_csv.iloc[i, -1]:.3f}"
                url += f"&{columns[3:][j]}={tmp}"
            except:
                pass
            
        if isinstance(dice_0, float):
            if (dice_0 >= thres):
                urls.append(url)

    for col in columns:
        if col in columns[3:4]:
            dice_pred = []
            dice_true = []
            for row in data_csv.loc[:, col]:
                dice = row.split("/")
                dice_0 = float(dice[0])
                dice_1 = float(dice[1])
                dice_pred.append(dice_0)
                dice_true.append(dice_1)
    
    dice_pred = np.array(dice_pred)
    dice_true = np.array(dice_true)

    return (dice_pred, dice_true), urls