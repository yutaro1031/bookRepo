import React from "react";
import * as queryString from "query-string";
import { useHistory } from "react-router";
import { Spacer, Flex, Typography, Spinner, Button } from "ingred-ui";
import { Response } from "../../../client/types";
import { client } from "../../../client";
import { TopicCard } from "../../elements/TopicCard";

const SelectNounTopics: React.FunctionComponent = () => {
  const history = useHistory();
  const [requesting, setRequesting] = React.useState<boolean>(false);
  // NOTE: [book_id: number, words: string[]][]
  const [topics, setTopic] = React.useState<
    Response.ShowNounTopics["noun_topics"]
  >([]);
  const [selectedIndex, setSelectedIndex] = React.useState<Set<number>>(
    new Set<number>(),
  );

  React.useEffect(() => {
    const parsedParam = queryString.parse(location.search.slice(1), {
      arrayFormat: "comma",
      parseNumbers: true,
    });
    const getTopics = async () => {
      setRequesting(true);
      const res = await client.getNounTopics({
        book_ids: (parsedParam["book_ids"] as number[]) || [],
      });
      setTopic(res.data.noun_topics);
      setRequesting(false);
    };
    getTopics();
  }, []);

  const createHandleSelect = (index: number) => {
    return function () {
      const newSet = new Set(selectedIndex);
      if (selectedIndex.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      setSelectedIndex(newSet);
    };
  };

  function handleClickButton() {
    const bookIds: number[] = [];
    selectedIndex.forEach((index) => bookIds.push(topics[index][0]));
    history.push(`/selectBooks?book_ids=${bookIds.join(",")}`);
  }

  return (
    <Spacer pt={10}>
      <Flex display="flex" alignItems="center" flexDirection="column">
        <Typography weight="bold" size="xxxl">
          あなたが欲しい本に近いイメージの単語群をなるべく多く選択してください
        </Typography>
        <Spacer pt={6} />
        {requesting ? (
          <Spinner />
        ) : (
          topics.map((topic, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Spacer key={index} py={2}>
              <TopicCard
                checked={selectedIndex.has(index)}
                words={topic[1]}
                onClick={createHandleSelect(index)}
              />
            </Spacer>
          ))
        )}
        <Spacer pt={6} />
        <Button
          inline
          disabled={selectedIndex.size === 0}
          onClick={handleClickButton}
        >
          決定
        </Button>
      </Flex>
    </Spacer>
  );
};

export { SelectNounTopics };