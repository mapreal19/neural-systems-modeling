% This script sets up a very simple simulation of habituation
% of the Aplysia gill withdrawal reflex.

% The size of the output (B) decreases with each input (A)

% INFO: Running with octave
% - octave
% - run habituationGWR.m

function main
  startWeight = 4;
  weigthDecrement = 0.7;
  pulse = [0 0 1 0 0];

  inputPulses = [pulse pulse pulse pulse pulse pulse];

  [_ numberOfPulses] = size(inputPulses);

  outputPulses = zeros(1, numberOfPulses);

  weight = startWeight;

  for t = 1:numberOfPulses,
    outputPulses(t) = weight * inputPulses(t); % find the output

    if inputPulses(t) > 0, % the input is present
      weight = weight * weigthDecrement;
    end
  end

  clf % clear the plotting window

  subplot(211) % set up the top subplot
  plotInput(inputPulses, numberOfPulses)

  subplot(212) % set up the bottom subplot
  plotOutput(outputPulses, numberOfPulses, startWeight)
endfunction

function plotInput (inputPulses, numberOfPulses)
  plot(inputPulses) % plot out the input time series
  axis([0 numberOfPulses 0 1.1]) % reset the axis limits
  xlabel('time step') % label the x axis
  ylabel('input') % label the y asis
  text(1, 1, 'A') % place the letter A near the top-left
endfunction

function plotOutput(outputPulses, numberOfPulses, startWeight)
  plot(outputPulses) % plot our the output time series
  axis([0 numberOfPulses 0 startWeight+0.5]) % reset the axis limits
  xlabel('time step') % label the x axis
  ylabel('output') % label the y axis
  text(1,4,'B') % place the letter B near the top-left
endfunction

main()
