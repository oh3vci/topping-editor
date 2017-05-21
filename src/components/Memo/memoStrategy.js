import { Entity } from 'draft-js';

function memoStrategy(contentBlock, cb) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();

      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'MEMO'
      );
    },
    cb
  );
}

export default memoStrategy;
