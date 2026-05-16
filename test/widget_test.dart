import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:app/main.dart';
import 'package:app/providers/app_provider.dart';
import 'package:app/screens/login_screen.dart';

void main() {
  testWidgets('App starts with LoginScreen', (WidgetTester tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => AppProvider(),
        child: const PulseNewsApp(),
      ),
    );
    expect(find.byType(LoginScreen), findsOneWidget);
    expect(find.text('Pulse News'), findsOneWidget);
  });
}
