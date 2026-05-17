import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/models.dart';
import '../services/news_service.dart';

class AppProvider with ChangeNotifier {
  final NewsService _newsService = NewsService();
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email'],
  );

  AppProvider() {
    _loadPreferences();
  }

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

  Future<void> _loadPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    _isOnboarded = prefs.getBool('isOnboarded') ?? false;
    _selectedSymbols = prefs.getStringList('selectedSymbols') ?? [];
    _userName = prefs.getString('userName') ?? "Trader";
    notifyListeners();
  }

  Future<void> login() async {
    try {
      final GoogleSignInAccount? account = await _googleSignIn.signIn();
      if (account != null) {
        _userName = account.displayName ?? "Trader";
        _isLoggedIn = true;
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('userName', _userName);
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Google Sign-In failed: $e");
      // If it fails (usually due to missing platform config in dev),
      // we still want the user to be able to use the app for now.
    }
  }

  void loginAsGuest() {
    _userName = "Guest Trader";
    _isLoggedIn = true;
    notifyListeners();
  }

  Future<void> logout() async {
    await _googleSignIn.signOut();
    _isLoggedIn = false;
    notifyListeners();
  }

  Future<void> completeOnboarding() async {
    _isOnboarded = true;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isOnboarded', true);
    notifyListeners();
  }

  Future<void> toggleSymbol(String symbol) async {
    if (_selectedSymbols.contains(symbol)) {
      _selectedSymbols.remove(symbol);
    } else {
      _selectedSymbols.add(symbol);
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('selectedSymbols', _selectedSymbols);
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
