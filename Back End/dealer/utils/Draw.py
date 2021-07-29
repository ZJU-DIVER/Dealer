import os
import warnings
import pandas as pd
import uuid
import matplotlib.pyplot as plt

warnings.filterwarnings('ignore')


def draw(sv):
    name = str(uuid.uuid1())
    path = os.getcwd() + '/dealer/utils/images/' + name + '.svg'
    df = pd.DataFrame(sv, columns=['id', 'sv', 'A', 'B', 'color', 'size'])

    plt.scatter(df['A'], df['B'], c=df['color'], s=df['size'], alpha=0.5)
    plt.grid(True)

    for i in range(len(df['id'])):
        plt.annotate(df['id'][i], xy=(df['A'][i], df['B'][i]),
                     xytext=(df['A'][i] + 0.03, df['B'][i] + 0.03))

    plt.xlabel('Sepal.Length')
    plt.ylabel('Sepal.Width')

    # plt.show()
    plt.savefig(path)
    plt.close()

    return name
