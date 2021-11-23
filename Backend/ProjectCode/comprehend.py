import logging
# from pprint import pprint
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)


class ComprehendDetect:
    """Encapsulates Comprehend detection functions."""

    def __init__(self, comprehend_client):
        self.comprehend_client = comprehend_client

    def detect_languages(self, text):
        """
        Detects languages used in a document.
        """
        try:
            response = self.comprehend_client.detect_dominant_language(Text=text)
            languages = response['Languages']
            logger.info("Detected %s languages.", len(languages))
        except ClientError:
            logger.exception("Couldn't detect languages.")
            raise
        else:
            return languages

    def detect_entities(self, text, language_code):
        """
        Detects entities in a document. Entities can be things like people and places
        or other common terms.
        """
        try:
            response = self.comprehend_client.detect_entities(
                Text=text, LanguageCode=language_code)
            # types = ['TITLE', 'ORGANIZATION', 'EVENT', 'COMMERCIAL_ITEM', 'DATE']
            entities = [{'Text': x['Text'], 'Type': x['Type']}
                        for x in response['Entities']]
            # entities = response['Entities']
            logger.info("Detected %s entities.", len(entities))
        except ClientError:
            logger.exception("Couldn't detect entities.")
            raise
        else:
            return entities

    def detect_key_phrases(self, text, language_code):
        """
        Detects key phrases in a document. A key phrase is typically a noun and its
        modifiers.
        """
        try:
            response = self.comprehend_client.detect_key_phrases(
                Text=text, LanguageCode=language_code)
            phrases = [x['Text'] for x in response['KeyPhrases']]
            logger.info("Detected %s phrases.", len(phrases))
        except ClientError:
            logger.exception("Couldn't detect phrases.")
            raise
        else:
            return phrases


def comprehend_text(sample_text):
    comp_detect = ComprehendDetect(boto3.client('comprehend'))

    # demo_size = 20
    try:
        languages = comp_detect.detect_languages(sample_text)
        lang_code = languages[0]['LanguageCode']

        entities = comp_detect.detect_entities(sample_text, lang_code)
        entities = [ele['Text'] for ele in entities]

        phrases = comp_detect.detect_key_phrases(sample_text, lang_code)
    except Exception as e:
        # print(e)
        return {"entities": [], "phrases": []}
    return {"entities": entities, "phrases": phrases}
