class Stock {
  final String id;
  final String symbol;
  final String name;
  final String category;

  Stock({
    required this.id,
    required this.symbol,
    required this.name,
    required this.category,
  });
}

enum ImpactLevel { positive, negative, neutral }

class NewsImpact {
  final ImpactLevel level;
  final String description;
  final List<String> affectedSymbols;

  NewsImpact({
    required this.level,
    required this.description,
    required this.affectedSymbols,
  });
}

class NewsStory {
  final String id;
  final String title;
  final String summary;
  final String imageUrl;
  final String source;
  final String timestamp;
  final NewsImpact impact;
  final List<String> details;

  NewsStory({
    required this.id,
    required this.title,
    required this.summary,
    required this.imageUrl,
    required this.source,
    required this.timestamp,
    required this.impact,
    required this.details,
  });
}
