import MeCab
import neologdn

def analyze_text(word):
    # ↓Dockerのベースイメージによって変わるので注意
    tagger = MeCab.Tagger("-d /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd")
    tagger.parse("")
    result = {}
    noun = []
    adjective = []

    word = neologdn.normalize(word) #正規化
    node = tagger.parseToNode(word)

    while node:
        feature = node.feature.split(",")
        if feature[0] in ['形容詞']:
            adjective.append(node.feature.split(",")[6])
        elif feature[0] in ['名詞'] and not feature[1] in ['固有名詞', '数']:
            noun.append(node.feature.split(",")[6])
        node = node.next

    result["noun"] = noun
    result["adjective"] = adjective

    return result
