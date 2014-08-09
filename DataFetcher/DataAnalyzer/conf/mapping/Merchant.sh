curl -XDELETE 'http://127.0.0.1:9200/eat/merchant'

echo

curl -XPUT    'http://127.0.0.1:9200/eat/merchant/_mapping' -d '{
  "merchant": {
    "properties": {
      "businessId": { "type": "long"},
      "name": {"type": "string", "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"},
      "branchName": {"type": "string",  "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"},
      "address":{"type": "string", "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"},
      "phone": {"type": "string"},
      "city": {"type": "string",  "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"},
      "regions": {"type": "string",  "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"},
      "latitude": {"type": "float"},
      "longitude": {"type": "float"},
      "avgRating": {"type": "integer"},
      "productGrade": {"type": "integer"},
      "decorationGrade": {"type": "integer"},
      "serviceGrade": {"type": "integer"},
      "productScore": {"type": "long"},
      "decorationScore": {"type": "long"},
      "serviceScore": {"type": "long"},
      "logo": {"type": "string"},
      "businessUrl": {"type": "string"},
      "reviewCount": {"type": "integer"},
      "distance": {"type": "integer"},
      "reviews": {"type": "string", "indexAnalyzer": "ansj_index_analyzer", "searchAnalyzer": "ansj_index_analyzer"}
    }
  }
}'
