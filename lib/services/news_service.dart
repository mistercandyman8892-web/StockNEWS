import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

class NewsService {
  static const String _finnhubApiKey = "sandbox_c8r2r2aad3i9v2bt8vbg";

  Future<List<NewsStory>> fetchMarketNews({List<String> symbols = const []}) async {
    try {
      List<dynamic> allNews = [];

      if (symbols.isNotEmpty) {
        final today = DateTime.now().toIso8601String().split('T')[0];
        final lastWeek = DateTime.now().subtract(const Duration(days: 7)).toIso8601String().split('T')[0];

        final fetchPromises = symbols.take(3).map((symbol) async {
          final url = Uri.parse('https://finnhub.io/api/v1/company-news?symbol=$symbol&from=$lastWeek&to=$today&token=$_finnhubApiKey');
          final response = await http.get(url);
          if (response.statusCode == 200) {
            return json.decode(response.body) as List<dynamic>;
          }
          return [];
        });

        final results = await Future.wait(fetchPromises);
        allNews = results.expand((x) => x).toList();
      }

      if (allNews.isEmpty) {
        final url = Uri.parse('https://finnhub.io/api/v1/news?category=general&token=$_finnhubApiKey');
        final response = await http.get(url);
        if (response.statusCode == 200) {
          allNews = json.decode(response.body) as List<dynamic>;
        }
      }

      allNews.sort((a, b) => (b['datetime'] as int).compareTo(a['datetime'] as int));

      return allNews.take(10).indexed.map((entry) {
        final index = entry.$1;
        final item = entry.$2;

        return NewsStory(
          id: 'live-$index-${item['id']}',
          title: item['headline'] ?? '',
          summary: item['summary']?.isNotEmpty == true ? item['summary'] : "Stay updated with the latest market moves and financial trends.",
          imageUrl: (item['image']?.isNotEmpty == true) ? item['image'] : "https://images.unsplash.com/photo-1611974717483-36aa3921500d?auto=format&fit=crop&q=80&w=800",
          source: item['source'] ?? "Market Feed",
          timestamp: DateTime.fromMillisecondsSinceEpoch((item['datetime'] as int) * 1000).toLocal().toString().split(' ')[1].substring(0, 5),
          impact: NewsImpact(
            level: _determineImpact(item['headline'] ?? ''),
            description: "Live market update based on current headlines.",
            affectedSymbols: _extractSymbols(item['headline'] ?? ''),
          ),
          details: _generateKeyTakeaways(item['headline'] ?? '', item['summary'] ?? ''),
        );
      }).toList();
    } catch (e) {
      print("Error fetching news: $e");
      return [];
    }
  }

  ImpactLevel _determineImpact(String headline) {
    final lower = headline.toLowerCase();
    if (lower.contains("surge") || lower.contains("rise") || lower.contains("gain") || lower.contains("growth")) return ImpactLevel.positive;
    if (lower.contains("fall") || lower.contains("drop") || lower.contains("slump") || lower.contains("loss")) return ImpactLevel.negative;
    return ImpactLevel.neutral;
  }

  List<String> _extractSymbols(String headline) {
    const symbols = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOGL"];
    return symbols.where((s) => headline.contains(s)).toList();
  }

  List<String> _generateKeyTakeaways(String headline, String summary) {
    List<String> takeaways = [];
    if (headline.toLowerCase().contains("surge") || headline.toLowerCase().contains("rise")) {
      takeaways.add("Bullish momentum detected in recent trading sessions.");
    } else if (headline.toLowerCase().contains("fall") || headline.toLowerCase().contains("drop")) {
      takeaways.add("Bearish pressure mounting as investors react to new data.");
    } else {
      takeaways.add("Market remains cautious amid ongoing economic uncertainty.");
    }
    if (summary.isNotEmpty && summary.length > 20) {
      takeaways.add(summary.split('.').first + ".");
    } else {
      takeaways.add("Analysts are closely monitoring price action for breakout signals.");
    }
    takeaways.add("Historical volatility suggests potential for upcoming price discovery.");
    return takeaways;
  }
}
