import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../models/models.dart';
import '../services/news_service.dart';

class AppProvider with ChangeNotifier {
  final NewsService _newsService = NewsService();
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  bool _isLoggedIn = false;
  bool _isOnboarded = false;
  String _userName = "Trader";
  List<String> _selectedSymbols = [];
  List<NewsStory> _stories = [];
  bool _isLoadingStories = false;
  ThemeMode _themeMode = ThemeMode.dark;

  bool get isLoggedIn => _isLoggedIn;
  bool get isOnboarded => _isOnboarded;
  String get userName => _userName;
  List<String> get selectedSymbols => _selectedSymbols;
  List<NewsStory> get stories => _stories;
  bool get isLoadingStories => _isLoadingStories;
  ThemeMode get themeMode => _themeMode;

  final List<Stock> allStocks = [
    Stock(id: "1", symbol: "AAPL", name: "Apple Inc.", category: "Technology"),
    Stock(id: "2", symbol: "TSLA", name: "Tesla, Inc.", category: "Automotive"),
    Stock(id: "3", symbol: "NVDA", name: "NVIDIA Corp.", category: "Semiconductors"),
    Stock(id: "4", symbol: "MSFT", name: "Microsoft Corp.", category: "Technology"),
    Stock(id: "5", symbol: "AMZN", name: "Amazon.com, Inc.", category: "E-commerce"),
    Stock(id: "6", symbol: "GOOGL", name: "Alphabet Inc.", category: "Technology"),
    Stock(id: "7", symbol: "VOO", name: "Vanguard S&P 500", category: "Index Fund"),
    Stock(id: "8", symbol: "VTI", name: "Vanguard Total Stock", category: "ETF"),
  ];

  Future<void> login() async {
    try {
      final account = await _googleSignIn.signIn();
      if (account != null) {
        _userName = account.displayName ?? "Trader";
      }
    } catch (e) {
      print("Google Sign-In failed: $e");
    }
    _isLoggedIn = true;
    notifyListeners();
  }

  void logout() async {
    await _googleSignIn.signOut();
    _isLoggedIn = false;
    notifyListeners();
  }

  void completeOnboarding() {
    _isOnboarded = true;
    notifyListeners();
  }

  void toggleSymbol(String symbol) {
    if (_selectedSymbols.contains(symbol)) {
      _selectedSymbols.remove(symbol);
    } else {
      _selectedSymbols.add(symbol);
    }
    notifyListeners();
  }

  void toggleTheme() {
    _themeMode = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    notifyListeners();
  }

  Future<void> refreshStories() async {
    _isLoadingStories = true;
    notifyListeners();
    _stories = await _newsService.fetchMarketNews(symbols: _selectedSymbols);
    _isLoadingStories = false;
    notifyListeners();
  }
}
