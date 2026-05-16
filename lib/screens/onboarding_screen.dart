import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int _step = 0;
  final PageController _pageController = PageController();

  void _nextStep() {
    if (_step < 2) {
      setState(() => _step++);
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    } else {
      context.read<AppProvider>().completeOnboarding();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          _StepIntro(onNext: _nextStep),
          _StepGoals(onNext: _nextStep),
          _StepAssets(onNext: _nextStep),
        ],
      ),
    );
  }
}

class _StepIntro extends StatelessWidget {
  final VoidCallback onNext;
  const _StepIntro({required this.onNext});

  @override
  Widget build(BuildContext context) {
    return _BaseStep(
      title: "Market Intelligence, Simplified.",
      subtitle: "Focus on what matters. We distill complex data into easy-to-read daily stories.",
      buttonText: "Get Started",
      onNext: onNext,
      child: Center(
        child: Icon(Icons.auto_graph, size: 120, color: Theme.of(context).primaryColor),
      ),
    );
  }
}

class _StepGoals extends StatefulWidget {
  final VoidCallback onNext;
  const _StepGoals({required this.onNext});

  @override
  State<_StepGoals> createState() => _StepGoalsState();
}

class _StepGoalsState extends State<_StepGoals> {
  String? _selectedGoal;
  final goals = ["Long-term Wealth", "Day Trading", "Passive Income", "Market Neutral"];

  @override
  Widget build(BuildContext context) {
    return _BaseStep(
      title: "What are your goals?",
      subtitle: "Customize your news feed based on your investment strategy.",
      buttonText: "Next Step",
      onNext: _selectedGoal != null ? widget.onNext : () {},
      child: ListView.builder(
        shrinkWrap: true,
        itemCount: goals.length,
        itemBuilder: (context, index) {
          final goal = goals[index];
          final isSelected = _selectedGoal == goal;
          return Padding(
            padding: const EdgeInsets.only(bottom: 12.0),
            child: InkWell(
              onTap: () => setState(() => _selectedGoal = goal),
              borderRadius: BorderRadius.circular(20),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected ? Theme.of(context).primaryColor : Colors.grey[300]!,
                    width: 2,
                  ),
                  color: isSelected ? Theme.of(context).primaryColor.withValues(alpha: 0.05) : null,
                ),
                child: Row(
                  children: [
                    Text(goal, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    const Spacer(),
                    if (isSelected) const Icon(Icons.check_circle),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _StepAssets extends StatelessWidget {
  final VoidCallback onNext;
  const _StepAssets({required this.onNext});

  @override
  Widget build(BuildContext context) {
    final appProvider = context.watch<AppProvider>();
    return _BaseStep(
      title: "Select your assets.",
      subtitle: "Pick at least one to start your briefing.",
      buttonText: "Start My Briefing",
      onNext: appProvider.selectedSymbols.isNotEmpty ? onNext : () {},
      child: GridView.builder(
        shrinkWrap: true,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 1.5,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: appProvider.allStocks.length,
        itemBuilder: (context, index) {
          final stock = appProvider.allStocks[index];
          final isSelected = appProvider.selectedSymbols.contains(stock.symbol);
          return InkWell(
            onTap: () => appProvider.toggleSymbol(stock.symbol),
            borderRadius: BorderRadius.circular(20),
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: isSelected ? Theme.of(context).primaryColor : Theme.of(context).colorScheme.secondary,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    stock.symbol,
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      color: isSelected ? (Theme.of(context).brightness == Brightness.dark ? Colors.black : Colors.white) : null,
                    ),
                  ),
                  Text(
                    stock.name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12,
                      color: isSelected ? (Theme.of(context).brightness == Brightness.dark ? Colors.black54 : Colors.white70) : Colors.grey[600],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _BaseStep extends StatelessWidget {
  final String title;
  final String subtitle;
  final String buttonText;
  final VoidCallback onNext;
  final Widget child;

  const _BaseStep({
    required this.title,
    required this.subtitle,
    required this.buttonText,
    required this.onNext,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 60),
          Text(
            title,
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: -1),
          ),
          const SizedBox(height: 12),
          Text(
            subtitle,
            style: TextStyle(color: Colors.grey[600], fontSize: 16, height: 1.5),
          ),
          const SizedBox(height: 40),
          Expanded(child: child),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            height: 64,
            child: ElevatedButton(
              onPressed: onNext,
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).primaryColor,
                foregroundColor: Theme.of(context).colorScheme.onPrimary,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              child: Text(buttonText, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            ),
          ),
        ],
      ),
    );
  }
}
